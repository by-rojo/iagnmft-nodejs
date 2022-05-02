# iagmft-nodejs

Node JS affiliate SPA built with NextJS and React

##

Amazon Reseller shop for iaintgotmoneyforthat.com with automated import scripts using the Amazon Reselllers API and Wordpress as a headless CMS.


## Requirements

1. Node version in the `.nvmrc` file is always recommended
1. Built with `npm` never tested with `yarn` but it *should* work fine
1. Wordpress server on `https`
1. Access to the Amazon Reseller API
1. I deployed this on Vercel
1. Anything but Windows

## NextJS

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/)

## State Management
Each page is going to be rendered using `getStaticProps` because its incredibly performant. These pages will be rendered at build time and recompiled on the server when the expiry time has past.

All of the static page data is available via context api.

### Step 1
First setup the page in `/page/<your-page>.tsx` with `getStaticProps`

```tsx
import type { NextPage } from 'next'
import someAPICall from '../api-factory/wp/menus'
import SomeComponent from '../components/some-component'
import { StaticPageContext } from '../context/static-page-context'

type SomeData = {
    success: boolean
}

interface SomePageStaticData {
  someData: SomeData
}

const SomePage: NextPage<SomePageStaticData> = ({ someData }) => {
  const staticPageData: DefaultContext<SomePageStaticData> = {
    menu,
  }

  return (
    <StaticPageContext data={staticPageData}>
      <SomeComponent />
    </StaticPageContext>
  )
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps() {
  const menu = await someAPICall()

  return {
    props: {
      someData,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, //60 * 60 * 24, // 24 hrs
  }
}

export default SomePage
```

### Then setup a fancy hook (optional)
There is a generic context hook available called `useStaticPageContext` which returns our static props.

For this example I created several helper functions to reduce the need to keep writing so much typescript.

```tsx
import { useStaticPageContext } from '../../context/static-page-context'

type ExampleData {}

interface SomePageStaticData {
  exampleData: ExampleData
}

const useStaticSomePageData = (): DefaultContext<SomePageStaticData> => {
  return useStaticPageContext<SomePageStaticData>()
}

export default useStaticSomePageData
```

### Finally you can use the context
`useStaticSomePageData` in this example returns value from the provider. So all props will be available
```tsx
import React from 'react'
import useStaticSomePageData from './hooks'

const AnyComponent: React.FC = () => {
  const stuff = useStaticSomePageData()
  return <div className="test">{JSON.stringify(stuff)}</div>
}

export default AnyComponent
```

## TODO
[ ] Add unit tests