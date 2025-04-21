import { formatDate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface BlogPost {
    id: string;
    title: string;
    content: string;
    imageUrl: string;
    authorImage: string;
    authorName: string;
    authorId: string;
    createdAt: Date;
    updatedAt: Date;
}

interface BlogCardProps {
    item: BlogPost;
}

const BlogCard = ({ item }: BlogCardProps) => {

    const noImageUrl = "https://i.pinimg.com/474x/82/a3/3a/82a33a43be59e913b58efbdfd64e281e.jpg";
    const defaultImageUrl = item.imageUrl || noImageUrl;

    return (
        <div className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md transition-all hover:shadow-lg">
            <Link href={`/post/${item.id}`} className="block h-full w-full">
                <div className="relative h-48 w-full overflow-hidden">
                    <Image
                        src={defaultImageUrl}
                        alt={`${item.title}'s image`}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </div>

                <div className="p-4">
                    <h3 className="mb-2 text-lg font-semibold text-gray-900">
                        {item.title}
                    </h3>
                    <p className="mb-4 text-sm text-gray-600 line-clamp-2">
                        {item.content}
                    </p>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <div className="relative size-8 overflow-hidden rounded-full">
                                <Image
                                    src={item.authorImage}
                                    alt={item.authorName}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <p className="text-sm font-medium text-gray-700">
                                {item.authorName}
                            </p>
                        </div>

                        <time className="text-xs text-gray-500">
                            {formatDate(item.createdAt)}
                        </time>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default BlogCard;