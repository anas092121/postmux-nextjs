"use client";
import { useState, useEffect } from "react";
import Link from "next/link"; // ✅ Added import for navigation
import axios from "axios";
import PostCard from "@/components/PostCard";
import { useRouter } from "next/navigation";

export default function DashboardPosts() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("/api/posts");
        setPosts(res.data);
        setFilteredPosts(res.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    // ✅ Filters posts in real time as user types
    const filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  const handleEditPost = (id) => router.push(`/dashboard/posts/edit/${id}`);
  const handleDeletePost = async (id) => {
    try {
      await axios.delete(`/api/posts/${id}`);
      // ✅ Removes deleted post from both arrays
      setPosts(posts.filter((p) => p._id !== id));
      setFilteredPosts(filteredPosts.filter((p) => p._id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleDuplicatePost = async (id) => {
    try {
      const postToDuplicate = posts.find((p) => p._id === id);
      if (!postToDuplicate) return;

      // ✅ Creates a copy of the selected post
      const { title, content, image } = postToDuplicate;
      const newPost = { title: `${title} (Copy)`, content, image };
      const res = await axios.post("/api/posts", newPost);

      // ✅ Updates UI instantly with the new copy
      setPosts([...posts, res.data]);
      setFilteredPosts([...filteredPosts, res.data]);
    } catch (error) {
      console.error("Error duplicating post:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Posts</h1>
      <input
        type="text"
        placeholder="Search posts..."
        value={search}
        onChange={handleSearch}
        className="border p-2 rounded w-full mb-6"
      />

      {/* ✅ Wrapped PostCard in Link to make entire card clickable */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <Link key={post._id} href={`/posts/${post._id}`}>
            <PostCard
              post={post}
              showActions={true}
              showAuthor={false}
              onEdit={handleEditPost}
              onDelete={handleDeletePost}
              onDuplicate={handleDuplicatePost}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
