"use client";

import Link from 'next/link'
import { buttonVariants } from './ui/button';
import NavLink from './NavLink';
import { RegisterLink, LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import Image from 'next/image';
import CustomDropdown from './CustomDropdown';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';

const Navbar = () => {
    const { getUser } = useKindeBrowserClient();
    const user = getUser();

    const userImg = user?.picture || "https://i.pinimg.com/474x/6e/59/95/6e599501252c23bcf02658617b29c894.jpg";

    return (
        <nav className='py-5 flex items-center justify-between'>
            <div className="flex items-center gap-8 md:gap-12">
                <Link href="/">
                    <h1 className='text-3xl font-semibold'>
                        Blog
                        <span className='text-blue-500 font-bold'>
                            Githinji
                        </span>
                    </h1>
                </Link>

                <div className="hidden sm:flex items-center gap-6">
                    <NavLink href="/">Home</NavLink>
                    <NavLink href="/dashboard">Dashboard</NavLink>
                </div>
            </div>

            {user ? (
                <CustomDropdown
                    trigger={
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 relative rounded-full overflow-hidden">
                                <Image
                                    src={userImg}
                                    alt="User profile"
                                    width={40}
                                    height={40}
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    }
                >
                    <div className="py-2 px-4 flex flex-col gap-2">
                        <h3 className="inline">
                            Signed in as, <span className="font-medium">
                                {user.given_name}
                            </span>
                        </h3>
                        <LogoutLink className={
                            buttonVariants({
                                variant: "destructive",
                                className: ""
                            })
                        }>
                            Logout
                        </LogoutLink>
                    </div>
                </CustomDropdown>
            ) : (
                <div className="flex items-center gap-4">
                    <LoginLink className={buttonVariants({ variant: "default" })}>
                        Login
                    </LoginLink>
                    <RegisterLink className={buttonVariants({ variant: "outline" })}>
                        Sign Up
                    </RegisterLink>
                </div>
            )}
        </nav>
    )
}

export default Navbar;