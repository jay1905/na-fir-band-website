import { useState, useEffect } from 'react';

// Simulated post data - replace with actual API calls in production
const POSTS = [
  {
    id: 1,
    slug: 'welcome-to-na-fir',
    title: 'Welcome to Na Fir',
    excerpt: 'Learn more about our Celtic Folk Metal band from Germany and our journey into creating unique musical experiences.',
    content: 'Full content of the welcome post...',
    image: '/images/posts/welcome.jpg',
    date: '2024-03-01',
    author: 'Na Fir'
  },
  {
    id: 2,
    slug: 'new-album-announcement',
    title: 'New Album: Celtic Warriors',
    excerpt: 'We are excited to announce our upcoming album "Celtic Warriors" featuring 12 brand new tracks.',
    content: 'Full content of the album announcement...',
    image: '/images/posts/album.jpg',
    date: '2024-02-28',
    author: 'Na Fir'
  },
  {
    id: 3,
    slug: 'european-tour-2024',
    title: 'European Tour 2024',
    excerpt: 'Join us on our journey across Europe as we bring our Celtic metal to various festivals and venues.',
    content: 'Full content of the tour announcement...',
    image: '/images/posts/tour.jpg',
    date: '2024-02-25',
    author: 'Na Fir'
  },
  {
    id: 4,
    slug: 'behind-the-scenes',
    title: 'Behind the Scenes: Studio Session',
    excerpt: 'Take a peek into our recording process and the making of our latest album.',
    content: 'Full content of the studio session post...',
    image: '/images/posts/studio.jpg',
    date: '2024-02-20',
    author: 'Na Fir'
  },
  {
    id: 5,
    slug: 'folk-instruments',
    title: 'Our Folk Instruments',
    excerpt: 'Discover the traditional instruments we use to create our unique Celtic metal sound.',
    content: 'Full content about our instruments...',
    image: '/images/posts/instruments.jpg',
    date: '2024-02-15',
    author: 'Na Fir'
  },
  {
    id: 6,
    slug: 'meet-the-band',
    title: 'Meet the Band Members',
    excerpt: 'Get to know each member of Na Fir and their musical background.',
    content: 'Full content about band members...',
    image: '/images/posts/band.jpg',
    date: '2024-02-10',
    author: 'Na Fir'
  },
  {
    id: 7,
    slug: 'celtic-influences',
    title: 'Our Celtic Influences',
    excerpt: 'Explore the Celtic mythology and traditions that inspire our music.',
    content: 'Full content about Celtic influences...',
    image: '/images/posts/celtic.jpg',
    date: '2024-02-05',
    author: 'Na Fir'
  },
  {
    id: 8,
    slug: 'fan-gallery',
    title: 'Fan Art Gallery',
    excerpt: 'Check out amazing artwork created by our talented fans.',
    content: 'Full content of fan art showcase...',
    image: '/images/posts/fanart.jpg',
    date: '2024-02-01',
    author: 'Na Fir'
  }
];

const ITEMS_PER_PAGE = 6;

// Format date helper function
export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

// Hook for fetching all posts with pagination
export const usePosts = (page = 1, limit = ITEMS_PER_PAGE) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Calculate pagination
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedPosts = POSTS.slice(startIndex, endIndex);
        const total = Math.ceil(POSTS.length / limit);

        setPosts(paginatedPosts);
        setTotalPages(total);
        setError(null);
      } catch (err) {
        setError('Failed to fetch posts. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [page, limit]);

  return { posts, isLoading, error, totalPages };
};

// Hook for fetching a single post by slug
export const usePost = (slug) => {
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsLoading(true);
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        const foundPost = POSTS.find(p => p.slug === slug);
        if (foundPost) {
          setPost(foundPost);
          setError(null);
        } else {
          setError('Post not found');
        }
      } catch (err) {
        setError('Failed to fetch post. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  return { post, isLoading, error };
};

// Export additional utilities
export const getRecentPosts = (limit = 3) => {
  return [...POSTS]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, limit);
};

export const getRelatedPosts = (currentSlug, limit = 3) => {
  return POSTS
    .filter(post => post.slug !== currentSlug)
    .sort(() => Math.random() - 0.5) // Randomly sort posts
    .slice(0, limit);
};

export default usePosts;
