import { GetStaticProps } from 'next';
import Prismic from '@prismicio/client';
import Head from 'next/head';
import { getPrismicClient } from '../../services/prismic';
import styles from './styles.module.scss'

export default function Posts() {
    return (
        <>
        <Head>
            <title>Posts | Ignews</title>
        </Head>

        <main className={styles.container}>
            <div className={styles.posts}>
                <a href="">
                    <time>10 de dezembro de 2021</time>
                    <strong> React News about webhooks</strong>
                    <p> Welcome to the post about webhooks from react</p>
                </a>
                <a href="">
                    <time>10 de dezembro de 2021</time>
                    <strong> React News about webhooks</strong>
                    <p> Welcome to the post about webhooks from react</p>
                </a>
                <a href="">
                    <time>10 de dezembro de 2021</time>
                    <strong> React News about webhooks</strong>
                    <p> Welcome to the post about webhooks from react</p>
                </a>
            </div>
        </main>

        </>
    );
}

export const getSaticProps: GetStaticProps = async () => {
    const prismic = getPrismicClient()
    
    const response = await prismic.query([
        Prismic.Predicates.at('document.type', 'post')
    ], {
        fetch: ['post.title', 'post.content'], 
        pageSize: 100,
    }) 

    return {
        props: {}
    } 
}