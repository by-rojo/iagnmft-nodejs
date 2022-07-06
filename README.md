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
1. WP Plugin `WP-REST-API V2 Menus` for the menu to populate
1. `Woocomerce` WP Plugin and [REST API](https://woocommerce.github.io/woocommerce-rest-api-docs/#delete-a-refund)

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

## ENV Variables
There are several places you should update the env variables if you have a change or you need to add something. 

If you are using Vercel:

* go the the main dashboard of your application
* click `settings`
* navigate to `Environment Variables`
* add your env variables and secrets through the UI

If you are using something else – Look up how to safely add env variables to _____. Where blank could be one of AWS, GC, GoDaddy, Site5, HostGator, etc...

Once you add the envs to your production build:

* navigate to the project code 
* open .env and add your env variable to the file DO NOT PUT A VALUE: `MY_VARIABLE=`
* ALL VARIABLES are read as `string`s by the time it gets to the JS,`MY_VARIABLE=` should be undefined at this point

Setup your `.env.local` file - the place to keep secrets secret on yoru machine and not expose them to the internet. Put super top secret things in there like api keys, etc...

* Create a `.env.local` file if you havn't made one already
* Now add your variable with a value `MY_VARIABLE=test`
* Insure that the `.env.local` file is gitignored (it is by default)
* Restart your server and push your changes and deploy your code 


## VS Code
You will need these plugins at some point! If you need to install the code function type `command + p` then `>shell` and select install `code command`

You can also install them 1 by one by copying the extension name and putting it in the search under the plugins tab in vscode.

```
code --install-extension agauniyal.vscode-caniuse
code --install-extension akamud.vscode-caniuse
code --install-extension anseki.vscode-color
code --install-extension asciidoctor.asciidoctor-vscode
code --install-extension asvetliakov.snapshot-tools
code --install-extension chenxsan.vscode-standardjs
code --install-extension christian-kohler.npm-intellisense
code --install-extension christian-kohler.path-intellisense
code --install-extension dbaeumer.vscode-eslint
code --install-extension dzannotti.vscode-babel-coloring
code --install-extension eamodio.gitlens
code --install-extension ecmel.vscode-html-css
code --install-extension eg2.vscode-npm-script
code --install-extension esbenp.prettier-vscode
code --install-extension GitHub.vscode-pull-request-github
code --install-extension glen-84.sass-lint
code --install-extension henrynguyen5-vsc.vsc-nvm
code --install-extension jeff-hykin.better-cpp-syntax
code --install-extension jeremyrajan.file-script-runner
code --install-extension jeremyrajan.webpack
code --install-extension johnpapa.vscode-peacock
code --install-extension leizongmin.node-module-intellisense
code --install-extension mgmcdermott.vscode-language-babel
code --install-extension mohsen1.prettify-json
code --install-extension mrmlnc.vscode-scss
code --install-extension Orta.vscode-jest
code --install-extension q.typescript-mono-repo-import-helper
code --install-extension samuelroy.vscode-styled-jsx-stylus
code --install-extension shd101wyy.markdown-preview-enhanced
code --install-extension sibiraj-s.vscode-scss-formatter
code --install-extension steoates.autoimport
code --install-extension stylelint.vscode-stylelint
code --install-extension syler.sass-indented
code --install-extension VisualStudioExptTeam.vscodeintellicode
code --install-extension vscode-icons-team.vscode-icons
code --install-extension wk-j.webpack-progress
code --install-extension Zignd.html-css-class-completion
```


## TODO

[ ] Generate application - create a npx script to dynamically generate apps

[ ] Add unit tests

[ ] Add premium plugins

[ ] Add social media meta data and sharing - premium plugin

[ ] Optimize SEO - premium plugin

[ ] Add model popup with newsletter signup with 10% off - premium plugin

[ ] Add comments to blog posts and product pages - preium plugin

[ ] Create Landing Page for buying Plugins