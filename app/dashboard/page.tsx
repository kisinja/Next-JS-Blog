import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import prisma from '@/utils/connect';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import BlogCard from "@/components/BlogCard";

const getData = async (userId: string) => {
    const data = await prisma.blogPost.findMany({
        where: {
            authorId: userId,
        },
        orderBy: {
            createdAt: "desc",
        }
    });
    return data;
};

const DashBoard = async () => {

    const { getUser } = getKindeServerSession();
    const user = await getUser();

    const data = await getData(user?.id as string);
    console.log(data);

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-medium">Your Blog Articles</h2>

                <Link href="/dashboard/create" className={buttonVariants({ variant: "default" })}>
                    Create Post
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.length > 0 ? data.map((item, index) => (
                    <BlogCard key={index} item={item} index={index} />
                )) : (
                    <p className="text-gray-500">No posts found.</p>
                )}
            </div>
        </div>
    )
}

export default DashBoard
