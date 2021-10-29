import { GetStaticProps } from 'next'
import Head from 'next/head'
import React from 'react'
import { stripe } from '../services/stripe'
import { SubscribeButton } from '../components/SubscribeButton'

import styles from './home.module.scss'

/* Chamadas API
1 - Client-Side: const [x, setX] = useState()
useEffect() {
  const response = await fetch...
},
2 - Server side generation, 
3 - Static site generation 
*/

interface HomeProps {
  product: {
    priceId: string,
    amount: number,
  }
}

export default function Home({ product }: HomeProps) {
  return (
    <>
    <Head>
      <title> Home - Ig.News </title>
    </Head>

    <main className={styles.contentContainer}>
      <section className={styles.hero}>
        <span> 👏 Hey, welcome! </span>
        <h1>News about the <span>React</span> world.</h1>
        <p>
          Get access to all the publications <br/> 
          <span>for {product.amount} month</span>
        </p>
        <SubscribeButton priceId= {product.priceId}/>
      </section>

      <img src="/images/avatar.svg" alt="Girl coding" />
    </main>
    </>
  )
}

export const getStaticProps: GetStaticProps  = async () => {
  const price = await stripe.prices.retrieve('price_1JoduUKYAguSPoWYpdJxrAo0')

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100),
  };

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, // 24 horas
  }
}

// SSG X SSR
/* 
SSG serve para quando queremos buscar na api alguma informação que não muda de usuário
para usuário. Já o SSR se trata de algo mais individual e momentâneo, que nunca se 
mantém estático dependendo de quem está fazendo uso da página ou de uma mudança constante
de informações.
*/