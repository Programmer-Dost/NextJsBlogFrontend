import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { IArticle } from '../types';
interface IPropType {
    article: IArticle;
}
const BlogCardWithImage = ({ article }: IPropType) => {
    return (
        <div className="bg-gradient-to-r from-violet-500 to-violet-900 rounded-md flex items-center h-64 w-fit">
            <div className='pl-2'>
            <Link href={`/article/${article?.attributes?.Slug}`}>
                
                <span className="text-2xl w-2/3 text-white  font-bold after:content-[''] after:bg-primary after:block after:w-16 after:h-1 after:rounded-md after:mt-2 cursor-pointer">
                    {article?.attributes?.Title}
                </span>
            </Link></div>
            <Image alt= "gitbook" src="/gitbook.svg" width={140} height={140} className='ml-1 md:ml-10 mr-2 md:mr-32' />
        </div>
    );
};

export default BlogCardWithImage;