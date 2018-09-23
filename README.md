# iq2

> Help understand and debug queries

LINKS
https://www.elastic.co/guide/en/kibana/current/development-embedding-visualizations.html
https://discuss.elastic.co/t/announcement-introducing-inquisitor-a-new-site-plugin-to-help-debug-queries/10976

---

## Development Setup
 |some_parent_folder_name
   |kibana
   |kibana-extra
     |iq2
 - ensure you have folder structure above where kibana is the es/kibana cloned repo and iq-2 is this cloned repo
 - nvm local 8.11.4
 
 - From kibana repo
   - ensure that you are the appropriate version branch (6.3)
   - run `yarn kbn bootstrap`

 - from iq2 directory 
   - boot up elasticsearch  `docker-compose up`
   - `yarn kbn boostrap` (1st time)
   - `yarn start`

See the [kibana contributing guide](https://github.com/elastic/kibana/blob/master/CONTRIBUTING.md) for instructions setting up your development environment. Once you have completed that, use the following yarn scripts.

  - `yarn kbn bootstrap`

    Install dependencies and crosslink Kibana and all projects/plugins.

    > ***IMPORTANT:*** Use this script instead of `yarn` to install dependencies when switching branches, and re-run it whenever your dependencies change.

  - `yarn start`

    Start kibana and have it include this plugin. You can pass any arguments that you would normally send to `bin/kibana`

      ```
      yarn start --elasticsearch.url http://localhost:9220
      ```

  - `yarn build`

    Build a distributable archive of your plugin.

  - `yarn test:browser`

    Run the browser tests in a real web browser.

  - `yarn test:server`

    Run the server tests using mocha.

For more information about any of these commands run `yarn ${task} --help`. For a full list of tasks checkout the `package.json` file, or run `yarn run`.
