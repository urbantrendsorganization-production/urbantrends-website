import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose
} from './ui/dialog';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Plus, X, Image as ImageIcon, UserPlus } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';

export default function AddProjectModal() {
  const navigate = useNavigate();
  const email = localStorage.getItem('userEmail');

  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    longDescription: '',
    githubUrl: '',
    liveUrl: '',
    category: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const suggestedTags = ['React', 'TypeScript', 'Node.js', 'Python', 'AI', 'Web3', 'Mobile', 'DevOps', 'Database', 'API', 'Docker', 'AWS'];

  const addTag = (tag) => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
      setTagInput('');
    }
  };
  const removeTag = (tagToRemove) => setTags(tags.filter(tag => tag !== tagToRemove));

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) return toast.error("File is too large (max 5MB)");
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const uploadImage = async (file) => {
    if (!file) return null;
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "YOUR_UPLOAD_PRESET"); // replace with your preset
    const res = await fetch("https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload", { method: "POST", body: data });
    const result = await res.json();
    return result.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("User email not found");

    try {
      setSubmitting(true);

      let imageUrl = imageFile ? await uploadImage(imageFile) : null;

      const payload = {
        title: formData.title,
        shortDescription: formData.description,
        longDescription: formData.longDescription,
        category: formData.category,
        tags, // send as array
        githubRepo: formData.githubUrl,
        liveUrl: formData.liveUrl,
        imageUrl, // URL from Cloudinary
        email,
      };

      const response = await axios.post(
        "https://urbantrends-backend-production-fde8.up.railway.app/developers/create",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );


      toast.success("Project successfully added!");
      navigate("/projects");
    } catch (err) {
      console.error("Failed to create project:", err.response?.data || err.message);
      toast.error(err.response?.data?.error || err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 bg-silver text-black hover:bg-silver/90">
          <UserPlus className="w-4 h-4" />
          Add New Project
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit} className="grid gap-6">
          <DialogHeader>
            <DialogTitle>Add New Project</DialogTitle>
            <DialogDescription>Fill in your project details, add tags and upload an image.</DialogDescription>
          </DialogHeader>

          {/* Basic Info */}
          <Card className="p-6 space-y-4">
            <div>
              <Label>Project Title *</Label>
              <Input value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required />
            </div>
            <div>
              <Label>Short Description *</Label>
              <Input value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} required />
            </div>
            <div>
              <Label>Detailed Description *</Label>
              <Textarea value={formData.longDescription} onChange={e => setFormData({ ...formData, longDescription: e.target.value })} rows={4} required />
            </div>
            <div>
              <Label>Category *</Label>
              <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} required>
                <option value="">Select a category</option>
                <option value="web">Web</option>
                <option value="mobile">Mobile</option>
                <option value="ai">AI</option>
                <option value="devops">DevOps</option>
                <option value="blockchain">Blockchain</option>
                <option value="tools">Developer</option>
                <option value="other">Other</option>
              </select>
            </div>
          </Card>

          {/* Tags */}
          <Card className="p-6 space-y-4">
            <Label>Add Tags</Label>
            <div className="flex gap-2">
              <Input
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addTag(tagInput))}
              />
              <Button type="button" onClick={() => addTag(tagInput)}><Plus /></Button>
            </div>
            {tags.length > 0 && <div className="flex flex-wrap gap-2">{tags.map(tag => <Badge key={tag} className="flex items-center gap-1">{tag}<button type="button" onClick={() => removeTag(tag)}><X className="h-3 w-3" /></button></Badge>)}</div>}
            <div className="flex flex-wrap gap-2">{suggestedTags.filter(tag => !tags.includes(tag)).map(tag => <Badge key={tag} onClick={() => addTag(tag)} className="cursor-pointer">+ {tag}</Badge>)}</div>
          </Card>

          {/* Links */}
          <Card className="p-6 space-y-4">
            <Label>GitHub Repo</Label>
            <Input value={formData.githubUrl} onChange={e => setFormData({ ...formData, githubUrl: e.target.value })} />
            <Label>Live Demo URL</Label>
            <Input value={formData.liveUrl} onChange={e => setFormData({ ...formData, liveUrl: e.target.value })} />
          </Card>

          {/* Image Upload */}
          <Card className="p-6 space-y-4">
            <Label>Project Image</Label>
            <label htmlFor="project-image" className="border-2 border-dashed rounded-lg p-12 text-center cursor-pointer hover:border-gray-400">
              {imagePreview ? <img src={imagePreview} alt="Preview" className="mx-auto max-h-64 object-cover rounded-lg" /> : <>
                <ImageIcon className="mx-auto h-12 w-12 mb-2" />
                <p>Click to upload or drag and drop</p>
                <p className="text-sm text-gray-500">PNG, JPG, GIF (max 5MB)</p>
              </>}
            </label>
            <input id="project-image" type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
          </Card>

          <DialogFooter className="flex justify-end gap-2">
            <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
            <Button type="submit" disabled={submitting}>{submitting ? 'Publishing...' : 'Publish Project'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
