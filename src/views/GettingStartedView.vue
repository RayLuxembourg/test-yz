<script setup lang="ts">
import Article from '../components/shared/Article.vue';
import Paragraph from '../components/shared/Paragraph.vue';
import CodeBlock from '../components/shared/CodeBlock.vue';
import Divider from '../components/shared/Divider.vue';
</script>

<template>
  <Article
    title="What is Compose SDK?"
    description="Compose SDK is a Software Development Kit that enables a composable code-driven way to use Sisense platform capabilities for building analytics and data driven experiences into your application."
  >
    <h2 className="text-3xl font-optimistic font-bold">Installing Compose SDK</h2>
    <Paragraph>To get started with Sisense Compose SDK, you'll need a Vue web app. If
      you need to create one, we recommend you try Vue <a href="https://vuejs.org/guide/quick-start#creating-a-vue-application">comand line tool</a>.
    </Paragraph>
    <Paragraph>
      <strong>Packages:</strong> You can install Sisense Compose SDK packages with either npm or yarn. Here's a quick overview
      of what is in each library:
    </Paragraph>
    <ul className="ml-6 my-3 list-disc">
      <li>
        <code>@sisense/sdk-ui-vue:</code> Vue components for rendering charts
        and executing queries against a Sisense instance.
      </li>
      <li>
        <code>@sisense/sdk-data:</code> Implementations of elements of
        dimensional modeling including dimensions, attributes, measures, and
        filters.
      </li>
      <li>
        <code>@sisense/sdk-cli:</code> A command-line tool for generating
        TypeScript representations of a Sisense data model.
      </li>
    </ul>
    <Paragraph>
      To install <code>@sisense/sdk-ui-vue</code> and <code>@sisense/sdk-data</code>, run the following command:
    </Paragraph>
    <CodeBlock language="bash" :showLineNumber="false">
      yarn add @sisense/sdk-ui-vue @sisense/sdk-data
    </CodeBlock>
    <Paragraph>
      Package <code>@sisense/sdk-cli</code> is not needed to run your app. It
      will be installed on the fly as you execute CLI commands using
      <a href="https://docs.npmjs.com/cli/v10/commands/npx">npx</a>.
    </Paragraph>
    <h2 className="font-bold text-2xl">Setting up your app</h2>
    <Paragraph>
      Inside your <code>App.vue</code>, or if you have a different entry file,
      add <code>SisenseContextProvider</code> to authenticate your app. Use SSO,
      Web Access Token, or API token for secure authentication.
    </Paragraph>
    <Paragraph>
      All code snippets in this demo application are assumed to be a child
      of SisenseContextProvider.
    </Paragraph>
    <CodeBlock language="html" :showLineNumber="true">
      {{`<script setup lang="ts">
import { SisenseContextProvider } from '@sisense/sdk-ui-vue';
</script>

<template>
  <SisenseContextProvider
    url="<instance url>"
    token="<api token>"
  >
  </SisenseContextProvider>
</template>`}}
    </CodeBlock>
    <Divider />
    <h2 className="font-bold text-3xl">
      Generating a data model representation
    </h2>
    <Paragraph>
      Next, you will want a data model that you can reference when building
      your charts. You do this with the CLI tool provided by <code>@sisense/sdk-cli</code>.
      Run the following command to create a file that contains a TypeScript representation
      of the Sample ECommerce data model, substituting <code>{{`<username>`}}</code> and
      <code>{{`<instance IP>`}}</code> with the values for your instance.
    </Paragraph>
    <Paragraph>
      For the examples in this demo application, <code>sample-ecommerce-generated.ts</code> was
      generated with the following command.
    </Paragraph>
    <CodeBlock language="bash" :showLineNumber="false">
      npx @sisense/sdk-cli get-data-model --username {{`<username>`}} --output
      sample-ecommerce-generated.ts --dataSource "Sample ECommerce" --url http://{{`<instance IP>[:<port>]`}}
    </CodeBlock>
  </Article>
</template>
