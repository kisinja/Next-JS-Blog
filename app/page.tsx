import BlogCard from "@/components/BlogCard";
import BlogCardSkeleton from "@/components/BlogCardSkeleton";
import prisma from "@/utils/connect";
import { Suspense } from "react";

const getData = async () => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  // Simulate a delay of 2 seconds
  const data = await prisma.blogPost.findMany({
    select: {
      title: true,
      content: true,
      imageUrl: true,
      authorImage: true,
      authorName: true,
      id: true,
      createdAt: true,
      updatedAt: true,
      authorId: true,
    }
  });

  return data;
};

const Home = () => {

  return (
    <div className='py-6'>
      <h1 className='text-3xl font-bold tracking-tight mb-8'>Latest Posts</h1>

      <Suspense fallback={<BlogCardSkeleton />}>
        <BlogPosts />
      </Suspense>
    </div>
  )
};

async function BlogPosts() {
  const data = await getData();

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      {data.map((item, index) => (
        <BlogCard key={index} item={item} index={index} />
      ))}
    </div>
  );
}

export default Home;