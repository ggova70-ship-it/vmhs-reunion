import { useEffect, useState } from 'react';

const MAX_IMAGES = 10;

export default function Gallery({ isAdmin }) {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(null);
  const [commentData, setCommentData] = useState({ name: '', email: '', comment: '' });

  useEffect(() => {
    fetchImages();
  }, []);

  async function fetchImages() {
    const res = await fetch('/api/images');
    const data = await res.json();
    setImages((data.resources || []).reverse());
  }

  async function handleUpload(e) {
    const files = Array.from(e.target.files || []);
    if (images.length >= MAX_IMAGES) {
      alert('Maximum 10 images reached');
      return;
    }

    setUploading(true);
    for (const file of files.slice(0, MAX_IMAGES - images.length)) {
      const dataUrl = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });

      const res = await fetch('/api/images', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ dataUrl, name: file.name }),
      });
      if (!res.ok) alert('Upload failed');
    }
    setUploading(false);
    fetchImages();
  }

  async function handleDelete(imageId) {
    if (!confirm('Delete this image?')) return;
    const res = await fetch(`/api/images/${imageId}`, { method: 'DELETE' });
    if (res.ok) fetchImages();
  }

  async function handleLike(imageId) {
    const res = await fetch(`/api/likes/${imageId}`, { method: 'POST' });
    if (res.ok) fetchImages();
  }

  async function handleAddComment(imageId) {
    if (!commentData.name || !commentData.comment) {
      alert('Please fill in name and comment');
      return;
    }
    const res = await fetch(`/api/comments/${imageId}`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(commentData),
    });
    if (res.ok) {
      setCommentData({ name: '', email: '', comment: '' });
      setShowCommentForm(null);
      fetchImages();
    }
  }

  return (
    <div className="space-y-6">
      <div className="card bg-gradient-to-r from-blue-50 to-indigo-50">
        <h2 className="text-3xl font-bold mb-2">Gallery</h2>
        <p className="text-gray-600 mb-4">Batch 2006-2007 Photos | {images.length}/{MAX_IMAGES} images</p>
        {isAdmin && (
          <div>
            <label className="btn-primary cursor-pointer inline-block">
              {uploading ? 'Uploading...' : 'Upload Image'}
              <input type="file" accept="image/*" multiple onChange={handleUpload} className="hidden" disabled={uploading || images.length >= MAX_IMAGES} />
            </label>
            {images.length >= MAX_IMAGES && <p className="text-red-600 mt-2 text-sm">Maximum images reached. Delete an image to upload more.</p>}
          </div>
        )}
      </div>

      {images.length === 0 ? (
        <div className="card text-center text-gray-500">No images yet. Be the first to upload!</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((image) => (
            <div key={image.public_id} className="card p-0 overflow-hidden">
              <div className="relative">
                <img src={image.secure_url} alt={image.public_id} className="w-full h-48 object-cover" />
                {isAdmin && (
                  <button
                    onClick={() => handleDelete(image.public_id)}
                    className="absolute top-2 right-2 btn-danger text-xs"
                  >
                    Delete
                  </button>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-center gap-4 mb-4">
                  <button onClick={() => handleLike(image.public_id)} className="flex items-center gap-1 text-red-600 hover:text-red-700">
                    ❤️ {image.likes || 0}
                  </button>
                  <button onClick={() => setShowCommentForm(image.public_id)} className="flex items-center gap-1 text-blue-600 hover:text-blue-700">
                    💬 {image.comments?.length || 0}
                  </button>
                </div>

                {showCommentForm === image.public_id && (
                  <div className="mb-4 space-y-2">
                    <input
                      type="text"
                      placeholder="Your name"
                      value={commentData.name}
                      onChange={(e) => setCommentData({ ...commentData, name: e.target.value })}
                      className="w-full border rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="email"
                      placeholder="Email (optional)"
                      value={commentData.email}
                      onChange={(e) => setCommentData({ ...commentData, email: e.target.value })}
                      className="w-full border rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500"
                    />
                    <textarea
                      placeholder="Add a comment..."
                      value={commentData.comment}
                      onChange={(e) => setCommentData({ ...commentData, comment: e.target.value })}
                      className="w-full border rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500"
                    />
                    <button onClick={() => handleAddComment(image.public_id)} className="btn-primary text-sm w-full">
                      Post Comment
                    </button>
                  </div>
                )}

                {image.comments && image.comments.length > 0 && (
                  <div className="space-y-2 text-sm">
                    {image.comments.slice(-2).map((c) => (
                      <div key={c.id} className="bg-gray-100 p-2 rounded">
                        <div className="font-medium">{c.name}</div>
                        <div className="text-gray-700">{c.comment}</div>
                      </div>
                    ))}
                    {image.comments.length > 2 && <div className="text-blue-600 cursor-pointer text-xs">View all {image.comments.length} comments</div>}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
