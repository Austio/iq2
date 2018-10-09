# iq2

> Help understand and debug queries

LINKS
https://www.elastic.co/guide/en/kibana/current/development-embedding-visualizations.html
https://discuss.elastic.co/t/announcement-introducing-inquisitor-a-new-site-plugin-to-help-debug-queries/10976

---

## Development Setup

-  Ensure that your folder structure is setup like this

```
 |some_parent_folder_name
   |kibana
   |kibana-extra
     |elastic-iq
```

- clone kibana into the `kibana` folder and checkout the branch for the version you are working on

- Set node version `nvm local 8.11.4`
 
- Elasticsearch 
  - boot up elasticsearch or start one with `docker-compose up`
 
- Kibana 
  - From kibana directory above
  - checkout the appropriate version branch (6.3/6.4/master/etc)
  - run `yarn kbn bootstrap`

- Elastic-IQ
  - run `yarn kbn boostrap` (1st time)
  - run `yarn start`

   
    Start kibana and have it include this plugin. You can pass any arguments that you would normally send to `bin/kibana`

      ```
      yarn start --elasticsearch.url http://localhost:9220
      ```

  
See the [kibana contributing guide](https://github.com/elastic/kibana/blob/master/CONTRIBUTING.md) for instructions setting up your development environment. Once you have completed that, use the following yarn scripts.

  - `yarn build`

    Build a distributable archive of your plugin.

  - `yarn test:browser`

    Run the browser tests in a real web browser.

  - `yarn test:server`

    Run the server tests using mocha.

For more information about any of these commands run `yarn ${task} --help`. For a full list of tasks checkout the `package.json` file, or run `yarn run`.
