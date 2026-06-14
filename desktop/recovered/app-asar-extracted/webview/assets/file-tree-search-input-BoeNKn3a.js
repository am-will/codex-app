import{s as e}from"./chunk-Cq_f4orQ.js";import{n as t,t as n}from"./jsx-runtime-DXKlqYIQ.js";import{R as r}from"./app-scope-DbsKKT7R.js";import{k as i,n as a,r as o,s,u as c}from"./vscode-api-B47PzOKa.js";import{c as l,n as u,o as d}from"./lib-vhXvRN7W.js";import{t as f}from"./button-DO-oxX3-.js";import{t as p}from"./use-stable-callback-52OdxJok.js";import{t as m}from"./context-menu-Cx-ZCB4Y.js";import{k as h}from"./rpc-ByJrNKRv.js";import{t as g}from"./x-DVRtrXYM.js";import{t as _}from"./use-platform-6l2GVgMn.js";import{i as v,n as y,r as b,t as x}from"./iconResolver-CwCgg976.js";import{t as S}from"./store-8_m1ZhjA.js";import{n as C,r as w}from"./use-resolved-theme-variant-BJw_XPwF.js";import{t as T}from"./open-target-context-menu-items-C7br_RYI.js";import{n as E,r as D}from"./open-target-selection-DTXA2Tp5.js";import{t as ee}from"./copy-to-clipboard-CbAhULtA.js";import{t as O}from"./search-Bn7bY7GL.js";import{n as k,t as A}from"./use-target-apps-VBLPUwiP.js";var j=`file-tree-container`,M=`data-file-tree-style`,N=`data-file-tree-unsafe-css`,P=`data-file-tree-scrollbar-measure`,F=`data-file-tree-scrollbar-gutter-measured`,te=`--trees-scrollbar-gutter-measured`,ne=`header`,re=`context-menu`,ie=`context-menu-trigger`,I={compact:{itemHeight:24,factor:.8},default:{itemHeight:30,factor:1},relaxed:{itemHeight:36,factor:1.2}};function ae(e,t){if(typeof e==`number`)return{itemHeight:t??I.default.itemHeight,factor:e};let n=I[e??`default`];return{itemHeight:t??n.itemHeight,factor:n.factor}}var oe=I.default.itemHeight,se=`@layer base, theme, unsafe;

@layer base {
  :host {
    /*
      CSS variables use a fallback stack to ensure user and theme colors slot
      in with ease. User colors take precedence over theme colors, which take
      precedence over defaults.

      Fallback order:

      1. --trees-*-override (explicit)
      2. --trees-theme-* (e.g. Shiki/VS Code tokens)
      3. defaults

      Theme variable names mirror Shiki/VS Code theme file JSON tokens.

      // Available CSS Color Overrides
      --trees-fg-override
      --trees-fg-muted-override
      --trees-bg-override
      --trees-bg-muted-override
      --trees-accent-override
      --trees-border-color-override

      --trees-focus-ring-color-override
      --trees-focus-ring-width-override
      --trees-focus-ring-offset-override

      --trees-search-fg-override
      --trees-search-font-weight-override
      --trees-search-bg-override

      --trees-selected-fg-override
      --trees-selected-bg-override
      --trees-selected-focused-border-color-override

      // Git Status Color Overrides
      --trees-status-added-override
      --trees-status-ignored-override
      --trees-status-modified-override
      --trees-status-renamed-override
      --trees-status-untracked-override
      --trees-status-deleted-override
      --trees-git-added-color-override
      --trees-git-ignored-color-override
      --trees-git-modified-color-override
      --trees-git-renamed-color-override
      --trees-git-untracked-color-override
      --trees-git-deleted-color-override

      // Built-in File Icon Color Overrides
      --trees-file-icon-color
      --trees-file-icon-color-astro
      --trees-file-icon-color-babel
      --trees-file-icon-color-bash
      --trees-file-icon-color-biome
      --trees-file-icon-color-bootstrap
      --trees-file-icon-color-browserslist
      --trees-file-icon-color-bun
      --trees-file-icon-color-c
      --trees-file-icon-color-cpp
      --trees-file-icon-color-claude
      --trees-file-icon-color-css
      --trees-file-icon-color-database
      --trees-file-icon-color-default
      --trees-file-icon-color-docker
      --trees-file-icon-color-eslint
      --trees-file-icon-color-git
      --trees-file-icon-color-go
      --trees-file-icon-color-graphql
      --trees-file-icon-color-html
      --trees-file-icon-color-image
      --trees-file-icon-color-javascript
      --trees-file-icon-color-json
      --trees-file-icon-color-markdown
      --trees-file-icon-color-mcp
      --trees-file-icon-color-npm
      --trees-file-icon-color-oxc
      --trees-file-icon-color-postcss
      --trees-file-icon-color-prettier
      --trees-file-icon-color-python
      --trees-file-icon-color-react
      --trees-file-icon-color-ruby
      --trees-file-icon-color-rust
      --trees-file-icon-color-sass
      --trees-file-icon-color-svg
      --trees-file-icon-color-svelte
      --trees-file-icon-color-svgo
      --trees-file-icon-color-swift
      --trees-file-icon-color-table
      --trees-file-icon-color-text
      --trees-file-icon-color-tailwind
      --trees-file-icon-color-terraform
      --trees-file-icon-color-typescript
      --trees-file-icon-color-vite
      --trees-file-icon-color-vscode
      --trees-file-icon-color-vue
      --trees-file-icon-color-wasm
      --trees-file-icon-color-webpack
      --trees-file-icon-color-yml
      --trees-file-icon-color-zig
      --trees-file-icon-color-zip

      // Density
      //
      // A unitless scale factor for padding, gaps, and indentation. Usually
      // set via \`density\` on useFileTree. Individual overrides take precedence.
      //
      //   Compact: 0.8
      //   Default: 1
      //   Relaxed: 1.2
      //
      --trees-density-override

      // Available CSS Layout Overrides
      --trees-gap-override
      --trees-border-radius-override
      --trees-font-family-override
      --trees-font-size-override
      --trees-font-weight-regular-override
      --trees-font-weight-semibold-override
      --trees-level-gap-override
      --trees-item-padding-x-override
      --trees-item-margin-x-override
      --trees-item-row-gap-override
      --trees-icon-width-override
      --trees-icon-nudge-override
      --trees-scrollbar-gutter-override
      --trees-padding-inline-override
    */

    --trees-accent: var(--trees-accent-override, #009fff);
    --trees-fg: var(
      --trees-fg-override,
      var(--trees-theme-sidebar-fg, light-dark(#6c6c71, #adadb1))
    );
    --trees-fg-muted: var(
      --trees-fg-muted-override,
      var(--trees-theme-sidebar-header-fg, light-dark(#84848a, #84848a))
    );
    --trees-bg: var(
      --trees-bg-override,
      var(--trees-theme-sidebar-bg, light-dark(#f8f8f8, #141415))
    );
    /* var(--trees-theme-list-hover-bg, light-dark(#dfebff59, #19283c59)) */
    --trees-bg-muted: var(
      --trees-bg-muted-override,
      var(
        --trees-theme-list-hover-bg,
        light-dark(
          color-mix(
            in lab,
            var(--trees-accent) var(--trees-bg-alpha-light, 8%),
            var(--trees-bg)
          ),
          color-mix(
            in lab,
            var(--trees-accent) var(--trees-bg-alpha-dark, 10%),
            var(--trees-bg)
          )
        )
      )
    );
    --trees-input-bg: var(
      --trees-input-bg-override,
      light-dark(#f8f8f8, #070707)
    );

    --trees-added-light: #16a994;
    --trees-added-dark: #00cab1;
    --trees-ignored-light: #adadb1;
    --trees-ignored-dark: #4a4a4e;
    --trees-modified-light: #1ca1c7;
    --trees-modified-dark: #08c0ef;
    --trees-renamed-light: #d5a910;
    --trees-renamed-dark: #ffd452;
    --trees-untracked-light: #16a994;
    --trees-untracked-dark: #00cab1;
    --trees-deleted-light: #ff2e3f;
    --trees-deleted-dark: #ff6762;

    --trees-border-color: var(
      --trees-border-color-override,
      var(--trees-theme-sidebar-border, light-dark(#eeeeef, #070707))
    );
    --trees-indent-guide-bg: var(
      --trees-indent-guide-bg-override,
      color-mix(in lab, var(--trees-fg-muted) 25%, transparent)
    );
    --trees-density: var(--trees-density-override, 1);
    --trees-border-radius: var(
      --trees-border-radius-override,
      calc(6px * var(--trees-density))
    );

    --trees-font-family: var(--trees-font-family-override, system-ui);
    --trees-font-size: var(--trees-font-size-override, 13px);
    --trees-font-weight-regular: var(--trees-font-weight-regular-override, 400);
    --trees-font-weight-semibold: var(
      --trees-font-weight-semibold-override,
      600
    );

    --trees-focus-ring-color: var(
      --trees-focus-ring-color-override,
      var(--trees-theme-focus-ring, var(--trees-accent))
    );
    --trees-focus-ring-width: var(--trees-focus-ring-width-override, 1px);
    --trees-focus-ring-offset: var(--trees-focus-ring-offset-override, -1px);

    --trees-search-fg: var(
      --trees-search-fg-override,
      var(--trees-theme-input-fg, var(--trees-fg))
    );
    --trees-search-font-weight: var(--trees-search-font-weight-override, 600);
    --trees-search-bg: var(
      --trees-search-bg-override,
      var(--trees-theme-input-bg, var(--trees-input-bg))
    );

    --trees-scrollbar-thumb: var(
      --trees-scrollbar-thumb-override,
      var(
        --trees-theme-scrollbar-thumb,
        color-mix(in lab, var(--trees-fg) 25%, var(--trees-bg))
      )
    );

    --trees-selected-fg: var(
      --trees-selected-fg-override,
      var(--trees-theme-list-active-selection-fg, var(--trees-fg))
    );
    --trees-selected-bg: var(
      --trees-selected-bg-override,
      var(
        --trees-theme-list-active-selection-bg,
        light-dark(
          color-mix(in lab, var(--trees-accent) 12%, var(--trees-bg)),
          color-mix(in lab, var(--trees-accent) 15%, var(--trees-bg))
        )
      )
    );
    --trees-selected-focused-border-color: var(
      --trees-selected-focused-border-color-override,
      var(--trees-theme-focus-ring, var(--trees-accent))
    );

    /* Git status (e.g. from Shiki theme gitDecoration.*) */
    --trees-status-added: var(
      --trees-status-added-override,
      var(
        --trees-theme-git-added-fg,
        light-dark(var(--trees-added-light), var(--trees-added-dark))
      )
    );
    --trees-status-ignored: var(
      --trees-status-ignored-override,
      var(
        --trees-theme-git-ignored-fg,
        light-dark(var(--trees-ignored-light), var(--trees-ignored-dark))
      )
    );
    --trees-status-modified: var(
      --trees-status-modified-override,
      var(
        --trees-theme-git-modified-fg,
        light-dark(var(--trees-modified-light), var(--trees-modified-dark))
      )
    );
    --trees-status-renamed: var(
      --trees-status-renamed-override,
      var(
        --trees-theme-git-renamed-fg,
        light-dark(var(--trees-renamed-light), var(--trees-renamed-dark))
      )
    );
    --trees-status-untracked: var(
      --trees-status-untracked-override,
      var(
        --trees-theme-git-untracked-fg,
        light-dark(var(--trees-untracked-light), var(--trees-untracked-dark))
      )
    );
    --trees-status-deleted: var(
      --trees-status-deleted-override,
      var(
        --trees-theme-git-deleted-fg,
        light-dark(var(--trees-deleted-light), var(--trees-deleted-dark))
      )
    );
    --trees-git-modified-color: var(
      --trees-git-modified-color-override,
      var(--trees-status-modified)
    );
    --trees-git-added-color: var(
      --trees-git-added-color-override,
      var(--trees-status-added)
    );
    --trees-git-ignored-color: var(
      --trees-git-ignored-color-override,
      var(--trees-status-ignored)
    );
    --trees-git-deleted-color: var(
      --trees-git-deleted-color-override,
      var(--trees-status-deleted)
    );
    --trees-git-renamed-color: var(
      --trees-git-renamed-color-override,
      var(--trees-status-renamed)
    );
    --trees-git-untracked-color: var(
      --trees-git-untracked-color-override,
      var(--trees-status-untracked)
    );

    --trees-icon-gray: light-dark(#84848a, #adadb1);
    --trees-icon-red: light-dark(#d52c36, #ff6762);
    --trees-icon-vermilion: light-dark(#ff8c5b, #d5512f);
    --trees-icon-orange: light-dark(#d47628, #ffa359);
    --trees-icon-yellow: light-dark(#d5a910, #ffd452);
    --trees-icon-green: light-dark(#199f43, #5ecc71);
    --trees-icon-teal: light-dark(#17a5af, #64d1db);
    --trees-icon-cyan: light-dark(#1ca1c7, #68cdf2);
    --trees-icon-blue: light-dark(#1a85d4, #69b1ff);
    --trees-icon-indigo: light-dark(#693acf, #9d6afb);
    --trees-icon-purple: light-dark(#a631be, #d568ea);
    --trees-icon-pink: light-dark(#d32a61, #ff678d);
    --trees-icon-mauve: light-dark(#594c5b, #79697b);

    --trees-file-icon-color-default: var(
      --trees-file-icon-color,
      var(--trees-icon-gray)
    );
    --trees-file-icon-color-astro: var(
      --trees-file-icon-color,
      var(--trees-icon-purple)
    );
    --trees-file-icon-color-babel: var(
      --trees-file-icon-color,
      var(--trees-icon-yellow)
    );
    --trees-file-icon-color-bash: var(
      --trees-file-icon-color,
      var(--trees-icon-green)
    );
    --trees-file-icon-color-biome: var(
      --trees-file-icon-color,
      var(--trees-icon-blue)
    );
    --trees-file-icon-color-bootstrap: var(
      --trees-file-icon-color,
      var(--trees-icon-indigo)
    );
    --trees-file-icon-color-browserslist: var(
      --trees-file-icon-color,
      var(--trees-icon-yellow)
    );
    --trees-file-icon-color-bun: var(
      --trees-file-icon-color,
      var(--trees-icon-mauve)
    );
    --trees-file-icon-color-c: var(
      --trees-file-icon-color,
      var(--trees-icon-blue)
    );
    --trees-file-icon-color-cpp: var(
      --trees-file-icon-color,
      var(--trees-icon-blue)
    );
    --trees-file-icon-color-claude: var(
      --trees-file-icon-color,
      var(--trees-icon-orange)
    );
    --trees-file-icon-color-css: var(
      --trees-file-icon-color,
      var(--trees-icon-indigo)
    );
    --trees-file-icon-color-database: var(
      --trees-file-icon-color,
      var(--trees-icon-purple)
    );
    --trees-file-icon-color-docker: var(
      --trees-file-icon-color,
      var(--trees-icon-blue)
    );
    --trees-file-icon-color-eslint: var(
      --trees-file-icon-color,
      var(--trees-icon-indigo)
    );
    --trees-file-icon-color-git: var(
      --trees-file-icon-vermilion,
      var(--trees-icon-vermilion)
    );
    --trees-file-icon-color-go: var(
      --trees-file-icon-color,
      var(--trees-icon-cyan)
    );
    --trees-file-icon-color-graphql: var(
      --trees-file-icon-color,
      var(--trees-icon-pink)
    );
    --trees-file-icon-color-html: var(
      --trees-file-icon-color,
      var(--trees-icon-orange)
    );
    --trees-file-icon-color-image: var(
      --trees-file-icon-color,
      var(--trees-icon-pink)
    );
    --trees-file-icon-color-javascript: var(
      --trees-file-icon-color,
      var(--trees-icon-yellow)
    );
    --trees-file-icon-color-json: var(
      --trees-file-icon-color,
      var(--trees-icon-orange)
    );
    --trees-file-icon-color-markdown: var(
      --trees-file-icon-color,
      var(--trees-icon-green)
    );
    --trees-file-icon-color-mcp: var(
      --trees-file-icon-color,
      var(--trees-icon-teal)
    );
    --trees-file-icon-color-npm: var(
      --trees-file-icon-color,
      var(--trees-icon-red)
    );
    --trees-file-icon-color-oxc: var(
      --trees-file-icon-cyan,
      var(--trees-icon-cyan)
    );
    --trees-file-icon-color-postcss: var(
      --trees-file-icon-color,
      var(--trees-icon-red)
    );
    --trees-file-icon-color-prettier: var(
      --trees-file-icon-color,
      var(--trees-icon-teal)
    );
    --trees-file-icon-color-python: var(
      --trees-file-icon-color,
      var(--trees-icon-blue)
    );
    --trees-file-icon-color-react: var(
      --trees-file-icon-color,
      var(--trees-icon-cyan)
    );
    --trees-file-icon-color-ruby: var(
      --trees-file-icon-color,
      var(--trees-icon-red)
    );
    --trees-file-icon-color-rust: var(
      --trees-file-icon-color,
      var(--trees-icon-orange)
    );
    --trees-file-icon-color-sass: var(
      --trees-file-icon-color,
      var(--trees-icon-pink)
    );
    --trees-file-icon-color-svg: var(
      --trees-file-icon-color,
      var(--trees-icon-orange)
    );
    --trees-file-icon-color-svelte: var(
      --trees-file-icon-color,
      var(--trees-icon-red)
    );
    --trees-file-icon-color-svgo: var(
      --trees-file-icon-color,
      var(--trees-icon-green)
    );
    --trees-file-icon-color-swift: var(
      --trees-file-icon-color,
      var(--trees-icon-orange)
    );
    --trees-file-icon-color-table: var(
      --trees-file-icon-color,
      var(--trees-icon-teal)
    );
    --trees-file-icon-color-text: var(
      --trees-file-icon-color,
      var(--trees-icon-gray)
    );
    --trees-file-icon-color-tailwind: var(
      --trees-file-icon-color,
      var(--trees-icon-cyan)
    );
    --trees-file-icon-color-terraform: var(
      --trees-file-icon-color,
      var(--trees-icon-indigo)
    );
    --trees-file-icon-color-typescript: var(
      --trees-file-icon-color,
      var(--trees-icon-blue)
    );
    --trees-file-icon-color-vite: var(
      --trees-file-icon-color,
      var(--trees-icon-purple)
    );
    --trees-file-icon-color-vscode: var(
      --trees-file-icon-color,
      var(--trees-icon-blue)
    );
    --trees-file-icon-color-vue: var(
      --trees-file-icon-color,
      var(--trees-icon-green)
    );
    --trees-file-icon-color-wasm: var(
      --trees-file-icon-color,
      var(--trees-icon-indigo)
    );
    --trees-file-icon-color-webpack: var(
      --trees-file-icon-color,
      var(--trees-icon-blue)
    );
    --trees-file-icon-color-yml: var(
      --trees-file-icon-color,
      var(--trees-icon-red)
    );
    --trees-file-icon-color-zig: var(
      --trees-file-icon-color,
      var(--trees-icon-orange)
    );
    --trees-file-icon-color-zip: var(
      --trees-file-icon-color,
      var(--trees-icon-orange)
    );

    --trees-level-gap: var(
      --trees-level-gap-override,
      calc(8px * var(--trees-density))
    );
    --trees-item-padding-x: var(
      --trees-item-padding-x-override,
      calc(8px * var(--trees-density))
    );
    --trees-item-margin-x: var(
      --trees-item-margin-x-override,
      calc(2px * var(--trees-density))
    );
    --trees-item-row-gap: var(
      --trees-item-row-gap-override,
      calc(6px * var(--trees-density))
    );
    --trees-icon-width: var(--trees-icon-width-override, 16px);
    --trees-icon-nudge: var(
      --trees-icon-nudge-override,
      calc(1px * var(--trees-density))
    );
    --trees-row-height: var(--trees-item-height, 30px);
    --trees-git-lane-width: var(--trees-git-lane-width-override, 12px);
    --trees-action-lane-width: var(
      --trees-action-lane-width-override,
      calc(var(--trees-icon-width) + 2px)
    );
    /* Keep the floating trigger aligned with the row's action lane. Going in
       from the root's right edge: the scroll container reserves
       \`--trees-padding-inline\` of effective inset on each side (its asymmetric
       padding formula cancels the scrollbar gutter on the right), the row
       sits inside that inset, and its trailing \`--trees-item-padding-x\` is the
       action lane itself. The trigger's own focus-ring margin then trims one
       pixel back so the button's visible right edge lines up with the lane. */
    --trees-context-menu-trigger-inline-offset: calc(
      var(--trees-padding-inline) + var(--trees-item-padding-x) -
        var(--trees-focus-ring-width)
    );

    --trees-scrollbar-gutter: var(--trees-scrollbar-gutter-override, 6px);
    --trees-padding-inline: var(--trees-padding-inline-override, 16px);

    color-scheme: light dark;
    display: flex;
    flex-direction: column;
    font-size: var(--trees-font-size);
    color: var(--trees-fg);
    background-color: var(--trees-bg);
    --truncate-marker-background-color: var(--trees-bg);
    --truncate-marker-background-overlay-color: transparent;
    font-family: var(--trees-font-family);
    font-weight: var(--trees-font-weight-regular);
  }

  :host([data-file-tree-virtualized='true']) {
    height: 100%;
    overflow: hidden;
  }

  [data-file-tree-virtualized-wrapper='true'] {
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  [data-file-tree-virtualized-root='true'] {
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  [data-file-tree-virtualized-scroll='true'],
  [data-file-tree-scrollbar-measure='true'] {
    --trees-scrollbar-thumb-current: transparent;
    overflow-y: auto;
    scrollbar-gutter: stable;

    &:hover {
      --trees-scrollbar-thumb-current: var(--trees-scrollbar-thumb);
    }

    &::-webkit-scrollbar {
      width: var(--trees-scrollbar-gutter);
      height: var(--trees-scrollbar-gutter);
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background-color: var(--trees-scrollbar-thumb-current);
      border: 1px solid transparent;
      background-clip: content-box;
      border-radius: calc(var(--trees-scrollbar-gutter) / 2);
    }

    &::-webkit-scrollbar-corner {
      background-color: transparent;
    }
  }

  /* These are styles for a temporarily generated element to measure the size
   * of the scrollbar.  It's intended to be somewhat similar in scrollbar style
   * scope to the scrollable tree so \`--trees-scrollbar-gutter-measured\` is an
   * accurate reflection of the size the scrollbar gutter takes up. */
  [data-file-tree-scrollbar-measure='true'] {
    position: absolute;
    top: 0;
    left: 0;
    visibility: hidden;
    pointer-events: none;
    width: 100px;
    height: 100px;
  }

  @supports (-moz-appearance: none) {
    [data-file-tree-virtualized-scroll='true'],
    [data-file-tree-scrollbar-measure='true'] {
      scrollbar-width: thin;
      scrollbar-color: var(--trees-scrollbar-thumb-current) transparent;
    }
  }

  [data-file-tree-virtualized-scroll='true'] {
    position: relative;
    overflow-y: auto;
    flex: 1 1 0;
    min-height: 0;
    padding-inline: max(
        calc(var(--trees-padding-inline) - var(--trees-item-margin-x)),
        0px
      )
      /* NOTE(amadeus): We can assume that all Webkit based browser gutters
       * will align to the value of '--trees-scrollbar-gutter', however if not, then
       * \`--trees-scrollbar-gutter-measured\` should correct it. Mostly we are
       * hoping to avoid SSR alignment jumps if possible. In non-SSR'd environments
       * \`--trees-scrollbar-gutter-measured\` should always be immediately available.
       */
      max(
        calc(
          var(--trees-padding-inline) - var(--trees-item-margin-x) -
            var(
              --trees-scrollbar-gutter-measured,
              var(--trees-scrollbar-gutter)
            )
        ),
        0px
      );
  }

  @supports (-moz-appearance: none) {
    [data-file-tree-virtualized-scroll='true'] {
      padding-inline: max(
          calc(var(--trees-padding-inline) - var(--trees-item-margin-x)),
          0px
        )
        /* NOTE(amadeus): However on Firefox it can vary a little bit, but most
         * likely the majority of cases will default to a 0px width scrollbar lets
         * inherit that first to avoid SSR jumps. In non-SSR'd environments
         * \`--trees-scrollbar-gutter-measured\` should always be immediately available.
         */
        max(
          calc(
            var(--trees-padding-inline) - var(--trees-item-margin-x) -
              var(--trees-scrollbar-gutter-measured, 0px)
          ),
          0px
        );
    }
  }

  [data-file-tree-sticky-overlay='true'] {
    position: sticky;
    top: 0;
    height: 0;
    z-index: 4;
    overflow: visible;
    pointer-events: none;
  }

  /* The overlay DOM is kept populated even at scrollTop=0 so the browser has
   * the rendered rows on hand the moment scrolling begins — otherwise the
   * compositor paints a scrolled frame before React can mount the overlay,
   * and the topmost sticky folder jumps up by a couple of pixels before it
   * "snaps" into its pinned position. We hide it via CSS whenever the scroll
   * is at the top and no scroll is in progress, so the preview doesn't leak
   * through at rest. \`data-overlay-reveal\` is stamped on the root only when
   * the user initiates a scroll while already at the top — exactly the case
   * where we need the pre-mounted overlay to be visible through the first
   * compositor frame. It is deliberately distinct from the general
   * \`data-is-scrolling\` flag so a scroll that ends at the top (e.g. ArrowUp
   * navigation) re-hides the overlay the instant the scroll lands, rather
   * than waiting for the hover-suppression timer to elapse. */
  [data-file-tree-virtualized-root='true'][data-scroll-at-top='true']:not(
      [data-overlay-reveal]
    )
    [data-file-tree-sticky-overlay='true'] {
    visibility: hidden;
  }

  [data-file-tree-sticky-overlay-content='true'] {
    background-color: var(--trees-bg);
    position: relative;
    pointer-events: none;
  }

  [data-file-tree-virtualized-list='true'] {
    background-color: var(--trees-bg);
    position: relative;
    min-height: 100%;
    width: 100%;
    overflow-anchor: none;

    &[data-is-scrolling] {
      pointer-events: none;
    }
  }

  [data-file-tree-virtualized-sticky-offset='true'] {
    contain: layout size;
  }

  [data-file-tree-virtualized-sticky='true'] {
    position: sticky;
    top: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    isolation: isolate;
    /* Promote to its own compositor layer so text inside the window is
     * rasterized once and GPU-translated during scroll. Without this, the
     * browser re-paints the window (and its text) at every scroll frame,
     * which produces visible 1px shake / character tearing. */
    will-change: transform;
  }

  [data-file-tree-search-container] {
    display: flex;
    padding: 0;
    padding-inline: var(--trees-padding-inline);
    margin-bottom: var(--trees-item-row-gap);
  }

  [data-file-tree-search-input] {
    --trees-focus-ring-width: 2px;
    font-family: var(--trees-font-family);
    font-size: var(--trees-font-size);
    flex: 1;
    height: var(--trees-row-height);
    /* 1px breathing room so the focus-visible outline isn't clipped when the
     * input sits flush against the top of the scroll container. */
    margin-block: 1px;
    padding-inline: var(--trees-item-padding-x);
    line-height: var(--trees-row-height);
    color: var(--trees-search-fg);
    background-color: var(--trees-search-bg);
    border: 1px solid var(--trees-border-color);
    border-radius: var(--trees-border-radius);
    outline: none;

    &::placeholder {
      color: color-mix(
        in lab,
        var(--trees-search-fg) 65%,
        var(--trees-search-bg)
      );
    }

    &:focus-visible,
    &[data-file-tree-search-input-fake-focus='true'] {
      outline: var(--trees-focus-ring-width) solid var(--trees-focus-ring-color);
      outline-offset: var(--trees-focus-ring-offset);
    }
  }

  /* The wrapper for the tree items */
  [role='tree'] {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: var(--trees-gap-override, 0);
  }

  /* LIST ITEM */
  [data-type='item'] {
    color: inherit;
    font-family: var(--trees-font-family);
    font-size: var(--trees-font-size);
    text-align: start;
    outline: none;
    background-color: var(--trees-bg);
    border: none;
    position: relative;

    padding: 0 var(--trees-item-padding-x);
    margin: 0 var(--trees-item-margin-x);
    cursor: pointer;
    -webkit-user-select: none;
            user-select: none;
    -webkit-touch-callout: none;
    touch-action: manipulation;
    display: flex;
    flex: 0 0 var(--trees-row-height);
    align-items: center;
    height: var(--trees-row-height);
    line-height: var(--trees-row-height);
    gap: var(--trees-item-row-gap);
    border-radius: var(--trees-border-radius);
    /* Row states may be translucent, so markers paint the tree background first
     * and then the state color on top to avoid compositing the same alpha twice. */
    --truncate-marker-background-color: var(--trees-bg);
    --truncate-marker-background-overlay-color: transparent;
    --truncate-marker-block-inset: 0px;

    &:hover,
    &[data-item-context-hover='true'] {
      background-color: var(--trees-bg-muted);
      --truncate-marker-background-overlay-color: var(--trees-bg-muted);
    }

    &[data-item-focused='true'],
    &:focus-visible {
      z-index: 2;

      /* Flattened segment markers sit high enough to cover the row outline unless
       * their painted background is inset by the focus ring width. */
      [data-item-flattened-subitems] {
        --truncate-marker-block-inset: var(--trees-focus-ring-width);
      }

      &::before {
        position: absolute;
        inset: 0;
        content: '';
        display: block;
        border-radius: var(--trees-border-radius);
        outline: var(--trees-focus-ring-width) solid
          var(--trees-focus-ring-color);
        outline-offset: var(--trees-focus-ring-offset);
        pointer-events: none;
      }

      &[data-item-selected='true']::before {
        outline-color: var(--trees-selected-focused-border-color);
      }
    }

    &[data-item-selected='true'] {
      color: var(--trees-selected-fg);
      background-color: var(--trees-selected-bg);
      --truncate-marker-background-overlay-color: var(--trees-selected-bg);
      z-index: 3;

      [data-item-section='icon'] {
        color: var(--trees-selected-fg);
      }
    }

    &[data-item-search-match='true'] {
      font-weight: var(--trees-search-font-weight);
    }
  }

  [data-type='item'][data-file-tree-sticky-row='true'] {
    pointer-events: auto;
  }

  /* Sticky rows opt back into pointer events because the overlay wrapper is
   * inert. During scroll, put them back under the same hover suppression as
   * the virtualized list so translucent hover states and menu triggers do not
   * paint over rows moving beneath the sticky stack. */
  [data-file-tree-virtualized-root='true'][data-is-scrolling]
    [data-type='item'][data-file-tree-sticky-row='true'] {
    pointer-events: none;
  }

  [data-file-tree-virtualized-root='true'][data-is-scrolling]
    [data-type='item'][data-file-tree-sticky-row='true']:hover:not(
      [data-item-selected='true']
    ),
  [data-file-tree-virtualized-root='true'][data-is-scrolling]
    [data-type='item'][data-file-tree-sticky-row='true'][data-item-context-hover='true']:not(
      [data-item-selected='true']
    ) {
    background-color: var(--trees-bg);
    --truncate-marker-background-overlay-color: transparent;
  }

  [data-item-selected='true']:has(+ [data-item-selected='true']) {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  [data-item-selected='true'] + [data-item-selected='true'] {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }

  /* Flattened Directory Parts */
  [data-item-flattened-subitems] {
    display: inline-flex;
    align-items: center;
    gap: 2px;
  }
  [data-item-flattened-subitem]:hover,
  [data-item-flattened-subitem-drag-target='true'] {
    text-decoration: underline;
  }

  /* Icon for each item */
  [data-item-section='icon'] {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--trees-fg-muted);
    fill: currentColor;
    width: var(--trees-icon-width);
  }

  :where([data-item-section='icon'] > [data-icon-token]) {
    color: var(--trees-fg-muted);
  }

  [data-file-tree-colored-icons='true'] {
    [data-icon-token='astro'] {
      color: var(--trees-file-icon-color-astro);
    }
    [data-icon-token='babel'] {
      color: var(--trees-file-icon-color-babel);
    }
    [data-icon-token='bash'] {
      color: var(--trees-file-icon-color-bash);
    }
    [data-icon-token='biome'] {
      color: var(--trees-file-icon-color-biome);
    }
    [data-icon-token='bootstrap'] {
      color: var(--trees-file-icon-color-bootstrap);
    }
    [data-icon-token='browserslist'] {
      color: var(--trees-file-icon-color-browserslist);
    }
    [data-icon-token='bun'] {
      color: var(--trees-file-icon-color-bun);
    }
    [data-icon-token='c'] {
      color: var(--trees-file-icon-color-c);
    }
    [data-icon-token='cpp'] {
      color: var(--trees-file-icon-color-cpp);
    }
    [data-icon-token='claude'] {
      color: var(--trees-file-icon-color-claude);
    }
    [data-icon-token='css'] {
      color: var(--trees-file-icon-color-css);
    }
    [data-icon-token='database'] {
      color: var(--trees-file-icon-color-database);
    }
    [data-icon-token='default'] {
      color: var(--trees-file-icon-color-default);
    }
    [data-icon-token='docker'] {
      color: var(--trees-file-icon-color-docker);
    }
    [data-icon-token='eslint'] {
      color: var(--trees-file-icon-color-eslint);
    }
    [data-icon-token='git'] {
      color: var(--trees-file-icon-color-git);
    }
    [data-icon-token='go'] {
      color: var(--trees-file-icon-color-go);
    }
    [data-icon-token='graphql'] {
      color: var(--trees-file-icon-color-graphql);
    }
    [data-icon-token='html'] {
      color: var(--trees-file-icon-color-html);
    }
    [data-icon-token='image'] {
      color: var(--trees-file-icon-color-image);
    }
    [data-icon-token='javascript'] {
      color: var(--trees-file-icon-color-javascript);
    }
    [data-icon-token='json'] {
      color: var(--trees-file-icon-color-json);
    }
    [data-icon-token='markdown'] {
      color: var(--trees-file-icon-color-markdown);
    }
    [data-icon-token='mcp'] {
      color: var(--trees-file-icon-color-mcp);
    }
    [data-icon-token='npm'] {
      color: var(--trees-file-icon-color-npm);
    }
    [data-icon-token='oxc'] {
      color: var(--trees-file-icon-color-oxc);
    }
    [data-icon-token='postcss'] {
      color: var(--trees-file-icon-color-postcss);
    }
    [data-icon-token='prettier'] {
      color: var(--trees-file-icon-color-prettier);
    }
    [data-icon-token='python'] {
      color: var(--trees-file-icon-color-python);
    }
    [data-icon-token='react'] {
      color: var(--trees-file-icon-color-react);
    }
    [data-icon-token='ruby'] {
      color: var(--trees-file-icon-color-ruby);
    }
    [data-icon-token='rust'] {
      color: var(--trees-file-icon-color-rust);
    }
    [data-icon-token='sass'] {
      color: var(--trees-file-icon-color-sass);
    }
    [data-icon-token='svg'] {
      color: var(--trees-file-icon-color-svg);
    }
    [data-icon-token='svelte'] {
      color: var(--trees-file-icon-color-svelte);
    }
    [data-icon-token='svgo'] {
      color: var(--trees-file-icon-color-svgo);
    }
    [data-icon-token='swift'] {
      color: var(--trees-file-icon-color-swift);
    }
    [data-icon-token='table'] {
      color: var(--trees-file-icon-color-table);
    }
    [data-icon-token='text'] {
      color: var(--trees-file-icon-color-text);
    }
    [data-icon-token='tailwind'] {
      color: var(--trees-file-icon-color-tailwind);
    }
    [data-icon-token='terraform'] {
      color: var(--trees-file-icon-color-terraform);
    }
    [data-icon-token='typescript'] {
      color: var(--trees-file-icon-color-typescript);
    }
    [data-icon-token='vite'] {
      color: var(--trees-file-icon-color-vite);
    }
    [data-icon-token='vscode'] {
      color: var(--trees-file-icon-color-vscode);
    }
    [data-icon-token='vue'] {
      color: var(--trees-file-icon-color-vue);
    }
    [data-icon-token='wasm'] {
      color: var(--trees-file-icon-color-wasm);
    }
    [data-icon-token='webpack'] {
      color: var(--trees-file-icon-color-webpack);
    }
    [data-icon-token='yml'] {
      color: var(--trees-file-icon-color-yml);
    }
    [data-icon-token='zig'] {
      color: var(--trees-file-icon-color-zig);
    }
    [data-icon-token='zip'] {
      color: var(--trees-file-icon-color-zip);
    }
  }

  /* Chevron rotation and visual alignment */
  /* Chevron pointing down */
  [data-icon-name='file-tree-icon-chevron'] {
    &[data-align-capitals='false'] {
      transform: translate(0, var(--trees-icon-nudge));
    }
    &[data-align-capitals='true'] {
      transform: translate(0, 0);
    }
  }

  [data-item-section='content'] {
    flex: 0 1 auto;
    text-align: start;
    min-width: 0;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    /* Breaks middle truncate component to also set this */
    /* white-space: nowrap; */
  }

  [data-item-section='decoration'] {
    flex: 1 1 0;
    min-width: 0;
    display: flex;
    justify-content: flex-end;
    text-align: end;
    overflow: hidden;
    color: var(--trees-fg-muted);
  }

  [data-item-section='decoration'] > span {
    min-width: 0;
    max-width: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: flex-end;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  [data-item-section='git'],
  [data-item-section='action'] {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  [data-item-section='git'] {
    width: var(--trees-git-lane-width);
  }

  [data-item-section='action'] {
    width: var(--trees-action-lane-width);
    color: var(--trees-fg-muted);
    fill: currentColor;
    pointer-events: none;
  }

  [data-item-section='git'] > span,
  [data-item-section='action'] > span {
    width: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  [data-item-action-affordance='decorative'] {
    opacity: 0.85;
  }

  [data-item-rename-input] {
    appearance: none;
    width: 100%;
    min-width: 0;
    height: calc(var(--trees-row-height) - 4px);
    font-family: inherit;
    font-size: inherit;
    /* line-height: calc(var(--trees-row-height) - 8px); */
    color: inherit;
    background-color: transparent;
    border: 0;
    padding-inline: 6px;
    outline: none;
    box-sizing: border-box;
  }

  [data-item-section='content']:has([data-item-rename-input])
    ~ [data-item-section='action'],
  [data-item-section='content']:has([data-item-rename-input])
    ~ [data-item-section='decoration'] {
    display: none;
  }

  /* Chevron pointing right */
  [aria-expanded='false'][data-item-type='folder']
    > [data-item-section='icon']
    > [data-icon-name='file-tree-icon-chevron'] {
    &[data-align-capitals='true'] {
      transform: rotate(-90deg)
        translate(
          calc(var(--trees-icon-nudge) / 2),
          calc(var(--trees-icon-nudge) / 2)
        );
    }
    &[data-align-capitals='false'] {
      transform: rotate(-90deg)
        translate(
          calc(var(--trees-icon-nudge) / 2 * -1),
          calc(var(--trees-icon-nudge) / 2)
        );
    }
  }

  /* LIST IDENTATION */
  /* Spacing container */
  [data-item-section='spacing'] {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: var(--trees-row-height);
    padding-left: calc(calc(var(--trees-icon-width) / 2) - 0.5px);

    &:empty {
      padding-left: 0;
    }
  }

  /* Spacing per level */
  [data-item-section='spacing-item'] {
    transform: translateX(-0.25px);
    display: inline-block;
    border-left: 1px solid var(--trees-indent-guide-bg);
    height: 100%;
    margin-right: calc(var(--trees-level-gap) - 1px);
    opacity: 0;
    transition: opacity 150ms ease;

    & + & {
      margin-left: calc(
        var(--trees-item-row-gap) + calc(var(--trees-icon-width) / 2) - 0.5px
      );
    }
  }

  :host(:hover) [data-item-section='spacing-item'] {
    opacity: 0.75;
  }

  /* Git status indicator */

  /* This is a folder that contains a git change */
  [data-item-contains-git-change='true'] > [data-item-section='git'] {
    color: var(--trees-git-modified-color);
    opacity: 0.5;
    fill: currentColor;
  }

  /* These are files that have a git change */
  [data-item-git-status] {
    &
      > :where([data-item-section='icon'])
      > :where(:not([data-icon-name='file-tree-icon-chevron'])) {
      color: var(--trees-item-git-status-color);
    }
    & > [data-item-section='content'] {
      color: var(--trees-item-git-status-color);
    }
    & > [data-item-section='git'] {
      color: var(--trees-item-git-status-color);
      font-weight: var(--trees-font-weight-semibold);
    }
  }

  [data-item-git-status='added'] {
    --trees-item-git-status-color: var(--trees-git-added-color);
  }

  [data-item-git-status='deleted'] {
    --trees-item-git-status-color: var(--trees-git-deleted-color);
  }

  [data-item-git-status='ignored'] {
    --trees-item-git-status-color: var(--trees-git-ignored-color);

    & > [data-item-section='icon'] {
      opacity: 0.5;
    }
  }

  [data-item-section='git'] [data-icon-name='file-tree-icon-dot'] {
    /* this is a nudge to align the dot with the likely lowercase text. it's slightly
    generalizable, but other fonts are gonna need other nudges i assume */
    transform: translateY(calc(0.65ex - 50%));
  }

  [data-item-git-status='modified'] {
    --trees-item-git-status-color: var(--trees-git-modified-color);
  }

  [data-item-git-status='renamed'] {
    --trees-item-git-status-color: var(--trees-git-renamed-color);
  }

  [data-item-git-status='untracked'] {
    --trees-item-git-status-color: var(--trees-git-untracked-color);
  }

  /* Drag and drop */
  [data-item-drag-target='true'] {
    background-color: var(--trees-selected-bg);
  }

  [data-item-dragging='true'] {
    opacity: 0.5;
  }

  /* Lock icon for locked paths (sibling of content) */
  [data-item-section='lock'] {
    flex: 0 0 auto;
    margin-left: auto;
    display: flex;
    align-items: center;
    color: var(--trees-fg-muted);
  }
  [data-item-section='lock'] svg {
    display: block;
  }

  [data-type='header-slot'] {
    display: block;
    flex: 0 0 auto;
  }

  [data-type='context-menu-wash'] {
    position: absolute;
    inset: 0;
    z-index: 3;
    background-color: transparent;
    touch-action: none;
  }

  [data-type='context-menu-anchor'] {
    position: absolute;
    top: 0;
    right: var(--trees-context-menu-trigger-inline-offset);
    z-index: 4;
    display: none;
    align-items: center;

    &[data-visible='true'] {
      display: flex;
    }
  }

  /* Hide the floating trigger while the scroll container is actively moving.
   * The anchor is positioned against the root, not the scroll content, so its
   * \`top\` follows the row via a React state update — one frame behind the
   * compositor. That delay is visible as the trigger hovering over the wrong
   * row during the first frame of a scroll. The \`data-is-scrolling\` flag on
   * the root is flipped synchronously on \`wheel\`/\`touchmove\`/\`keydown\` before
   * the compositor commits the next paint, so this selector hides the anchor
   * in the same frame the scroll begins. */
  [data-file-tree-virtualized-root='true'][data-is-scrolling]
    [data-type='context-menu-anchor'] {
    display: none;
  }

  [data-type='context-menu-anchor'] > slot[name='context-menu'] {
    display: block;
    width: 0;
    min-width: 0;
    flex: 0 0 0;
    overflow: visible;
  }

  /* Single floating context menu trigger */
  [data-type='context-menu-trigger'] {
    all: unset;
    align-items: center;
    justify-content: center;
    width: var(--trees-action-lane-width);
    color: var(--trees-fg-muted);
    fill: currentColor;
    cursor: pointer;
    font-family: var(--trees-font-family);
    font-size: var(--trees-font-size);
    border-top-right-radius: var(--trees-border-radius);
    border-bottom-right-radius: var(--trees-border-radius);
    margin: var(--trees-focus-ring-width);
    height: calc(var(--trees-row-height) - var(--trees-focus-ring-width) * 2);
    border-width: 0;
    transition: color 120ms ease;

    display: flex;
  }

  [data-type='context-menu-trigger']:hover,
  [data-type='context-menu-trigger'][aria-expanded='true'] {
    color: var(--trees-fg);
  }

  /** @pierre/truncate css here, manually copy pasted for now */
  [data-truncate-container] {
    /* CUSTOM TO TREES, TO SUPPORT THE OUTLINE */
    margin-top: -1px;
    margin-bottom: -1px;

    /* Width of the fade from default marker to text */
    --truncate-internal-marker-fade-width: var(
      --truncate-marker-fade-width,
      2px
    );
    /* Width of the solid color between the fade from the default marker to the text */
    --truncate-internal-marker-gap: var(--truncate-marker-gap, 0px);
    /* Opacity of the marker 'color' property, not of the element itself */
    --truncate-internal-marker-opacity: var(--truncate-marker-opacity, 50%);
    /* Opacity of the marker 'color' property specifically for the middle truncate, not opacity of the element itself */
    --truncate-internal-middle-marker-opacity: var(
      --truncate-middle-marker-opacity,
      80%
    );
    /* Background color of the default marker */
    --truncate-internal-marker-background-color: var(
      --truncate-marker-background-color,
      light-dark(white, black)
    );
    --truncate-internal-marker-background-overlay-color: var(
      --truncate-marker-background-overlay-color,
      transparent
    );
    --truncate-internal-marker-block-inset: var(
      --truncate-marker-block-inset,
      0px
    );
    /* Duration of the fade out animation for the marker */
    --truncate-internal-marker-fade-out-duration: var(
      --truncate-marker-fade-out-duration,
      0ms
    );
    /* Duration of the fade in animation for the marker */
    --truncate-internal-marker-fade-in-duration: var(
      --truncate-marker-fade-in-duration,
      100ms
    );

    /* FADE Variant specifics */
    --truncate-internal-fade-marker-color: var(
      --truncate-fade-marker-color,
      #000
    );
    --truncate-internal-fade-marker-width: var(
      --truncate-fade-marker-width,
      0.2lh
    );

    /*
    In some special cases people might be adding spacing in other ways
    that would benefit from being able to override this, however the container
    query below can't use this and would need to be redeclared with the overridden
    value. It's a bad time, but better than nothing.
    */
    --truncate-internal-single-line-height: 1lh;

    height: var(--truncate-internal-single-line-height);
    min-width: 0;
    overflow: hidden;
  }

  [data-truncate-marker] {
    display: flex;
    position: absolute;
    height: var(--truncate-internal-single-line-height);
    padding-block: var(--truncate-internal-marker-block-inset);
    box-sizing: border-box;
    align-items: center;
    background-clip: content-box;
    z-index: 2;
    color: color-mix(
      in srgb,
      currentColor var(--truncate-internal-marker-opacity),
      transparent
    );

    /* Core trick for hiding the marker until overflow occurs */
    opacity: 0;
    transition: opacity var(--truncate-internal-marker-fade-out-duration)
      ease-in-out;
  }

  @container measure (height > 1lh) {
    [data-truncate-marker] {
      opacity: 1;
      transition: opacity var(--truncate-internal-marker-fade-in-duration)
        ease-in-out;
    }
  }

  [data-truncate-grid] {
    display: grid;
    position: relative;
  }

  [data-truncate-content='visible'] {
    white-space: nowrap;
  }

  [data-truncate-content='overflow'] {
    opacity: 0;
    pointer-events: none;
    -webkit-user-select: none;
            user-select: none;
    word-break: break-all;
    margin-top: calc(-1 * var(--truncate-internal-single-line-height));
  }

  [data-truncate-marker-cell] {
    container: measure / size;
    overflow: visible;
    -webkit-user-select: none;
            user-select: none;
    pointer-events: none;
  }

  [data-truncate-container='truncate'] {
    & [data-truncate-grid] {
      grid-template-columns: minmax(0, max-content) 0;
    }
    & [data-truncate-marker] {
      right: 0;
    }
    & [data-truncate-fade] {
      margin-right: calc(-2 * var(--truncate-internal-fade-marker-width));
    }
  }

  [data-truncate-container='fruncate'] {
    & [data-truncate-grid] {
      grid-template-columns: 0 minmax(0, max-content) auto;
    }
    & [data-truncate-content] {
      direction: rtl;
    }
    & [data-truncate-content] > span {
      unicode-bidi: plaintext;
    }
    & [data-truncate-fade] {
      margin-left: calc(-2 * var(--truncate-internal-fade-marker-width));
    }
  }

  [data-truncate-variant='default'] {
    & [data-truncate-marker] {
      background-color: var(--truncate-internal-marker-background-color);
      background-image: linear-gradient(
        var(--truncate-internal-marker-background-overlay-color),
        var(--truncate-internal-marker-background-overlay-color)
      );
    }
    & [data-truncate-marker]::after,
    & [data-truncate-marker]::before {
      content: '';
      position: absolute;
      width: calc(
        var(--truncate-internal-marker-fade-width) +
          var(--truncate-internal-marker-gap)
      );
      inset-block-start: var(--truncate-internal-marker-block-inset);
      height: max(
        0px,
        calc(
          var(--truncate-internal-single-line-height) -
            var(--truncate-internal-marker-block-inset) * 2
        )
      );
      background-color: var(--truncate-internal-marker-background-color);
      background-image: linear-gradient(
        var(--truncate-internal-marker-background-overlay-color),
        var(--truncate-internal-marker-background-overlay-color)
      );
      mask-image: linear-gradient(
        var(--truncate-internal-fade-dir),
        #000 0%,
        #000 var(--truncate-internal-marker-gap),
        transparent 100%
      );
    }
    & [data-truncate-marker]::after {
      --truncate-internal-fade-dir: to right;
      right: calc(
        -1 *
          (
            var(--truncate-internal-marker-fade-width) +
              var(--truncate-internal-marker-gap)
          )
      );
    }
    & [data-truncate-marker]::before {
      --truncate-internal-fade-dir: to left;
      left: calc(
        -1 *
          (
            var(--truncate-internal-marker-fade-width) +
              var(--truncate-internal-marker-gap)
          )
      );
    }
  }

  [data-truncate-variant='fade'] {
    & [data-truncate-marker] {
      background: transparent;
    }
  }

  [data-truncate-fade] {
    box-shadow:
      0 0 calc(var(--truncate-internal-fade-marker-width) / 2)
        var(--truncate-internal-fade-marker-color),
      0 0 var(--truncate-internal-fade-marker-width)
        var(--truncate-internal-fade-marker-color);
    width: calc(var(--truncate-internal-fade-marker-width) * 2);
    height: calc(
      var(--truncate-internal-single-line-height) -
        (var(--truncate-internal-fade-marker-width) * 2)
    );
    margin: var(--truncate-internal-fade-marker-width) 0;
  }

  [data-truncate-group-container='middle'] {
    & [data-truncate-container] {
      --truncate-marker-opacity: var(--truncate-internal-middle-marker-opacity);
    }

    display: flex;
    min-width: 0;

    & > div {
      min-width: 0;
    }

    & > div[data-truncate-segment-priority='1'] {
      flex: 0 1 max-content;
    }
    & > div[data-truncate-segment-priority='2'] {
      flex: 0 999999 max-content;
    }
  }
}
`,ce=`@layer base, unsafe;`;function le(e){return`${ce}
@layer base {
  ${e}
}`}function ue(e){return`${ce}
@layer unsafe {
  ${e}
}`}var de=new WeakMap;function fe(e){let t=de.get(e);if(t!=null)return t;let n=document.createElement(`div`);n.setAttribute(P,`true`);let r=document.createElement(`div`);r.style.position=`relative`,r.style.height=`200%`,n.appendChild(r),e.appendChild(n);let i=Math.max(n.offsetWidth-n.clientWidth,0);return n.remove(),de.set(e,i),i}function pe(e,t){if(!e.isConnected)return;let n=fe(t);if(n==null)return;let r=t.querySelector(`style[${F}]`),i=r instanceof HTMLStyleElement?r:document.createElement(`style`);r instanceof HTMLStyleElement||(i.setAttribute(F,``),t.appendChild(i)),i.textContent=`:host { ${te}: ${n}px; }`}var L;function me(e){if(typeof CSSStyleSheet<`u`&&typeof CSSStyleSheet.prototype.replaceSync==`function`&&`adoptedStyleSheets`in e){L??(L=new CSSStyleSheet,L.replaceSync(le(se)));let t=!1;try{e.adoptedStyleSheets=[L],t=!0}catch{}if(t){e.querySelector(`style[${M}]`)?.remove();return}}if(e.querySelector(`style[data-file-tree-style]`)==null){let t=document.createElement(`style`);t.setAttribute(M,``),t.textContent=le(se),e.prepend(t)}}function R(e,t){he(e,t),me(t),pe(e,t)}function he(e,t){let n=e.querySelector(`template[shadowrootmode="open"], template[data-file-tree-shadowrootmode="open"]`);n instanceof HTMLTemplateElement&&(t.childNodes.length>0||(t.appendChild(n.content.cloneNode(!0)),n.hasAttribute(`shadowrootmode`)&&n.remove()))}if(typeof HTMLElement<`u`&&customElements.get(`file-tree-container`)==null){class e extends HTMLElement{constructor(){super()}connectedCallback(){let e=this.shadowRoot??this.attachShadow({mode:`open`});R(this,e)}}if(customElements.define(j,e),typeof document<`u`)for(let e of Array.from(document.querySelectorAll(j)))e instanceof HTMLElement&&R(e,e.shadowRoot??e.attachShadow({mode:`open`}))}var ge=e=>e.startsWith(`f::`)?e.slice(3):e;function _e(e){let t=e.lastIndexOf(`/`);return t<0?{parentPath:``,baseName:e}:{parentPath:e.slice(0,t),baseName:e.slice(t+1)}}function ve(e,t){return e===``?t:`${e}/${t}`}function ye({files:e,path:t,isFolder:n,nextBasename:r}){let i=ge(t),a=r.trim();if(a.length===0)return{error:`Name cannot be empty.`};if(a.includes(`/`))return{error:`Name cannot include "/".`};let{parentPath:o,baseName:s}=_e(i);if(a===s)return{nextFiles:e,sourcePath:i,destinationPath:i,isFolder:n};let c=ve(o,a),l=Array(e.length),u=new Set;if(!n){let t=`${c}/`,r=!1;for(let n=0;n<e.length;n++){let a=e[n];if(a!==i&&a.startsWith(t))return{error:`"${c}" already exists.`};let o=a===i?c:a;if(u.has(o))return{error:`"${c}" already exists.`};u.add(o),l[n]=o,a===i&&(r=!0)}return r?{nextFiles:l,sourcePath:i,destinationPath:c,isFolder:n}:{error:`Could not find the selected file to rename.`}}let d=`${i}/`,f=`${c}/`,p=0;for(let t=0;t<e.length;t++){let n=e[t],r=n===i||n.startsWith(d);if(!r&&(n===c||n.startsWith(f)))return{error:`"${c}" already exists.`};let a=r?`${c}${n.slice(i.length)}`:n;if(u.has(a))return{error:`"${c}" already exists.`};u.add(a),l[t]=a,r&&p++}return p===0?{error:`Could not find the selected folder to rename.`}:{nextFiles:l,sourcePath:i,destinationPath:c,isFolder:n}}function be(e){return e.endsWith(`/`)}function xe(e){let t=e.endsWith(`/`)?e.slice(0,-1):e,n=t.lastIndexOf(`/`),r=n<0?t:t.slice(n+1);return e.endsWith(`/`)?`${r}/`:r}function Se(e){let t=[],n=new Set;for(let r of e)n.has(r)||(n.add(r),t.push(r));let r=new Set;for(let e of t.toSorted((e,t)=>e.length===t.length?e.localeCompare(t):e.length-t.length)){let t=(e.endsWith(`/`)?e.slice(0,-1):e).split(`/`),n=!1;for(let e=0;e<t.length-1;e+=1){let i=`${t.slice(0,e+1).join(`/`)}/`;if(r.has(i)){n=!0;break}}n||r.add(e)}return t.filter(e=>r.has(e))}function z(e,t){return t.includes(e)?Se(t):[e]}function Ce(e,t){return e===t?!0:e==null||t==null?!1:e.kind===t.kind&&e.directoryPath===t.directoryPath&&e.flattenedSegmentPath===t.flattenedSegmentPath&&e.hoveredPath===t.hoveredPath}function we(e,t){return{draggedPaths:e,target:t}}function Te(e,t){if(t.kind!==`directory`||t.directoryPath==null)return!1;for(let n of e)if(be(n)&&(t.directoryPath===n||t.directoryPath.startsWith(n)))return!0;return!1}function B(e,t){return t.kind===`root`||t.directoryPath==null?xe(e):t.directoryPath}function Ee(e,t){let n=e.map(e=>{let n=B(e,t);return n===e?null:{from:e,to:n,type:`move`}}).filter(e=>e!=null);return n.length===0?null:{operations:n,result:{draggedPaths:e,operation:n.length===1?`move`:`batch`,target:t}}}function De(e,t){if(e===t)return!0;if(e.length!==t.length)return!1;for(let n=0;n<e.length;n+=1)if(e[n]!==t[n])return!1;return!0}function Oe(e,t,n){let{paths:r,preparedInput:i}=e;if(i==null){if(r==null)throw Error(`FileTree requires paths or preparedInput`);return{paths:r,preparedInput:void 0}}let a=i.paths;if(r==null)return{paths:a,preparedInput:i};if(!De(S.preparePaths(r,n==null?{}:{sort:n}),a))throw Error(`FileTree ${t} received paths and preparedInput for different path lists`);return{paths:a,preparedInput:i}}function ke(e){return e.operation===`add`||e.operation===`remove`||e.operation===`move`||e.operation===`batch`}function Ae(e,t,n){if(e===t)return n;let r=t.endsWith(`/`)?t:`${t}/`;return e.startsWith(r)?`${n.endsWith(`/`)?n:`${n}/`}${e.slice(r.length)}`:e}function je(e,t){if(e===t)return!0;let n=t.endsWith(`/`)?t:`${t}/`;return e.startsWith(n)}function Me(e,t,n=!1){if(e==null)return null;switch(t.operation){case`add`:case`expand`:case`collapse`:case`mark-directory-unloaded`:case`begin-child-load`:case`apply-child-patch`:case`complete-child-load`:case`fail-child-load`:case`cleanup`:return e;case`remove`:return je(e,t.path)?n?e:null:e;case`move`:return Ae(e,t.from,t.to);case`batch`:{let r=e;for(let e of t.events)if(r=Me(r,e,n),r==null)return null;return r}}}function Ne(e){return{canonicalChanged:e.canonicalChanged,projectionChanged:e.projectionChanged,visibleCountDelta:e.visibleCountDelta}}function Pe(e){switch(e.operation){case`add`:return{...Ne(e),operation:`add`,path:e.path};case`remove`:return{...Ne(e),operation:`remove`,path:e.path,recursive:e.recursive};case`move`:return{...Ne(e),from:e.from,operation:`move`,to:e.to}}}function Fe(e){return{...Ne(e),events:e.events.filter(e=>e.operation===`add`||e.operation===`remove`||e.operation===`move`).map(e=>Pe(e)),operation:`batch`}}function Ie(e){switch(e.operation){case`add`:case`remove`:case`move`:return Pe(e);case`batch`:return Fe(e);default:return null}}function Le(e,t){if(e.size!==t.length)return!1;for(let n of t)if(!e.has(n))return!1;return!0}function Re(e){let t=e.endsWith(`/`)?e.slice(0,-1):e;if(t.length===0)return[];let n=t.split(`/`);return n.slice(0,-1).map((e,t)=>`${n.slice(0,t+1).join(`/`)}/`)}function ze(e){return Re(e).at(-1)??null}function Be(e,t){return t==null?e:e.startsWith(t)?e.slice(t.length):e}function Ve(e){return e.endsWith(`/`)}var He=e=>e.toLowerCase();function Ue(e){let t=e.endsWith(`/`)?e.slice(0,-1):e,n=t.lastIndexOf(`/`);return n<0?t:t.slice(n+1)}function We(e){return e.endsWith(`/`)?e.slice(0,-1):e}function Ge(e,t){return t&&!e.endsWith(`/`)?`${e}/`:e}var Ke=e=>{let t=e.trim();return t.length===0?``:(t.includes(`\\`)?t.replaceAll(`\\`,`/`):t).toLowerCase()},qe=Symbol(`FILE_TREE_RENAME_VIEW`),Je=512,Ye=512;function Xe(e){return e===`top`||e===`center`?e:`nearest`}function Ze(e,t,n){if(e===0)return-1;if(n!=null){let e=t(n);if(e!=null)return e;let r=Re(n);for(let e=r.length-1;e>=0;--e){let n=r[e];if(n==null)continue;let i=t(n);if(i!=null)return i}}return 0}function Qe(e,t,n){if(e.paths.length===0)return{focusedIndex:-1,getParentIndex:e.getParentIndex,paths:e.paths,posInSetByIndex:e.posInSetByIndex,setSizeByIndex:e.setSizeByIndex};if(t==null)return{focusedIndex:0,getParentIndex:e.getParentIndex,paths:e.paths,posInSetByIndex:e.posInSetByIndex,setSizeByIndex:e.setSizeByIndex};let r=n??(t=>e.visibleIndexByPath.get(t)??null);return{focusedIndex:Ze(e.paths.length,r,t),getParentIndex:e.getParentIndex,paths:e.paths,posInSetByIndex:e.posInSetByIndex,setSizeByIndex:e.setSizeByIndex}}var $e=class{#e;#t=new Set;#n=new Map;#r=null;#i=null;#a=new Map;#o=new Map;#s=-1;#c=null;#l=!1;#u=e=>-1;#d=new Map;#f=null;#p=null;#m=null;#h=null;#g=null;#_;#v;#y;#b=[];#x=new Int32Array;#S=new Int32Array;#C=void 0;#w=!1;#T=null;#E=``;#D=!1;#O=new Set;#k=[];#A;#j=null;#M=null;#N=null;#P=null;#F=null;#I=null;#L=null;#R=0;#z=null;#B=new Set;#V=0;#H;#U=0;#W=!1;#G=0;#K;constructor(e){let{dragAndDrop:t,fileTreeSearchMode:n,initialSearchQuery:r,initialSelectedPaths:i,renaming:a,onSearchChange:o,paths:s,preparedInput:c,...l}=e,u=Oe({paths:s,preparedInput:c},`constructor`,l.sort);this.#e=l,t!=null&&t!==!1&&(this.#r=t===!0?{}:t),this.#w=a!=null&&a!==!1,a!=null&&a!==!1&&a!==!0&&(this.#C=a.canRename,this.#v=a.onError,this.#_=a.onRename),this.#y=o,this.#A=n??`hide-non-matches`,this.#H=this.#le(u.paths,u.preparedInput);let d=i?.map(e=>this.#Ne(e)).filter(e=>e!=null)??[],f=d.at(-1)??null;d.length>0&&(this.#B=new Set(d),this.#z=f,this.#V=1),this.#je(f,!1),r!=null&&this.#Te(r,!1),this.#K=this.#Re()}destroy(){this.#K?.(),this.#K=null,this.#n.clear(),this.#t.clear(),this.#d.clear(),this.#i=null,this.#he()}focusFirstItem(){this.#be().length>0&&this.#Fe(0)}focusLastItem(){this.#G<=0||(this.#Ie(),this.#Fe(this.#G-1))}focusNextItem(){this.#Ae(1)}focusParentItem(){if(this.#c==null)return;let e=ze(this.#c);if(e==null)return;let t=this.#Z(e);t>=0&&this.#Fe(t)}focusPath(e){let t=this.#H.getPathInfo(e)?.path??null;if(t==null)return;this.#Ie();let n=this.#Z(t);n>=0&&this.#Fe(n)}scrollToPath(e,t){let n=this.#H.getPathInfo(e)?.path??null;if(n==null)return;this.#Ie();let r=this.#xe(n);r<0||this.#Me(r)!=null&&(t?.focus!==!1&&this.#Fe(r,!1),this.#L={id:this.#R+=1,offset:Xe(t?.offset),visibleIndex:r},this.#De())}focusMountedPathFromInput(e){let t=this.#H.getPathInfo(e)?.path??null;if(t==null)return;let n=this.#Z(t);n>=0&&this.#Fe(n)}focusNearestPath(e){let t=this.resolveNearestVisiblePath(e);if(t==null)return null;let n=this.#Z(t);return n>=0?(this.#Fe(n),this.#be()[n]??t):null}focusPreviousItem(){this.#Ae(-1)}getFocusedIndex(){return this.#s}getFocusedItem(){return this.#c==null?null:this.#Q(this.#c)}getFocusedPath(){return this.#c}getScrollRequest(){return this.#L}clearScrollRequest(e){this.#L?.id===e&&(this.#L=null)}resolveNearestVisiblePath(e){let t=this.#be();if(this.#G===0)return null;if(e==null)return this.#c??t[0]??null;let n=this.#H.getPathInfo(e)?.path??e,r=this.#Z(n);return r>=0?t[r]??n:this.#X(n)??this.#c??t[0]??null}getSelectedPaths(){return[...this.#B]}getSelectionVersion(){return this.#V}getVisibleCount(){return this.#G}getVisibleRows(e,t){if(t<e||this.#G===0)return[];let n=Math.max(0,e),r=Math.min(this.#G-1,t);if(r<n)return[];let i=r-n+1;if(this.#F==null&&!this.#l&&r>=this.#b.length&&i<=Ye){let e=[];for(let t=n;t<=r;t+=1){let n=this.#H.getVisibleRowContext(t);if(n==null)break;e.push(this.#ee(n))}return e}if(!this.#l&&r>=this.#b.length&&this.#Ie(),this.#F!=null){let e=Array.from({length:r-n+1},(e,t)=>this.#Se(n+t)),t=new Map,i=e[0]??-1,a=i;for(let n=1;n<=e.length;n+=1){let r=e[n];if(r!=null&&r===a+1){a=r;continue}if(i>=0&&this.#H.getVisibleSlice(i,a).forEach((e,n)=>{t.set(i+n,e)}),r==null){i=-1,a=-1;continue}i=r,a=r}return Array.from({length:r-n+1},(e,r)=>{let i=n+r,a=this.#Se(i),o=t.get(a),s=this.#b[a];if(o==null||s==null)throw Error(`Missing projection row for filtered visible index ${String(i)}`);return this.#$(o,i,a,{ancestorPaths:this.#re(a),path:s})})}return this.#H.getVisibleSlice(n,r).map((e,t)=>{let r=n+t,i=this.#b[r];if(i==null)throw Error(`Missing projection path for visible index ${String(r)}`);return this.#$(e,r,r,{ancestorPaths:this.#re(r),path:i})})}getStickyRowCandidates(e,t){if(this.#F!=null)return null;if(this.#G===0||e<=0||t<=0)return[];let n=[];for(let r=0;r<this.#G;r+=1){let i=e+r*t,a=Math.min(this.#G-1,Math.floor(i/t)),o=this.#te(a,r)??(a>0?this.#te(a-1,r):void 0);if(o==null)break;n.push({row:this.#ee(o),subtreeEndIndex:o.subtreeEndIndex})}return n}getItem(e){let t=this.#H.getPathInfo(e);return t==null?null:this.#Q(t.path,t)}resolveMountedDirectoryPathFromInput(e){let t=this.#H.getPathInfo(e);return t?.kind===`directory`?t.path:null}toggleMountedDirectoryFromInput(e){let t=this.resolveMountedDirectoryPathFromInput(e);t!=null&&this.#ze(t)}selectAllVisiblePaths(){this.#Ie();let e=[...this.#be()];this.#ae(e,this.#c??this.#z)}selectOnlyPath(e){let t=this.#Ne(e);t!=null&&this.#ae([t],t)}selectOnlyMountedPathFromInput(e){this.#ae([e],e)}selectPath(e){let t=this.#Ne(e);t==null||this.#B.has(t)||this.#ae([...this.#B,t])}deselectPath(e){let t=this.#Ne(e);t==null||!this.#B.has(t)||this.#ae([...this.#B].filter(e=>e!==t))}toggleFocusedSelection(){this.#c!=null&&this.togglePathSelectionFromInput(this.#c)}togglePathSelection(e){let t=this.#Ne(e);if(t!=null){if(this.#B.has(t)){this.deselectPath(t);return}this.selectPath(t)}}togglePathSelectionFromInput(e){let t=this.#Ne(e);if(t!=null){if(this.#B.has(t)){this.#ae([...this.#B].filter(e=>e!==t),t);return}this.#ae([...this.#B,t],t)}}selectPathRange(e,t){let n=this.#Ne(e);if(n==null)return;this.#Ie();let r=this.#z,i=r==null?-1:this.#Ce(r),a=this.#Ce(n);if(i===-1||a===-1){let e=t?[...this.#B,n]:[n];this.#ae(e,n);return}let[o,s]=i<=a?[i,a]:[a,i],c=this.#be().slice(o,s+1),l=t?[...this.#B,...c]:c;this.#ae(l,r)}extendSelectionFromFocused(e){if(this.#c==null)return;let t=this.#s;if(t===-1)return;let n=Math.min(this.#G-1,Math.max(0,t+e));if(n===t)return;!this.#l&&n>=this.#b.length&&this.#Ie();let r=this.#be(),i=r[t]??null,a=r[n]??null;if(i==null||a==null)return;let o=new Set(this.#B);o.has(i)&&o.has(a)?o.delete(i):o.add(a),this.#ae([...o],this.#z??i,!1),this.#Fe(n)}getDragAndDropConfig(){return this.#r}isDragAndDropEnabled(){return this.#r!=null}getDragSession(){return this.#i==null?null:{draggedPaths:[...this.#i.draggedPaths],primaryPath:this.#i.primaryPath,target:this.#i.target==null?null:{...this.#i.target}}}startDrag(e){if(this.#r==null)return!1;let t=this.#Ne(e);if(t==null||this.#M!=null&&this.#M.length>0)return!1;let n=this.getSelectedPaths(),r=z(t,n);return this.#r.canDrag?.(r)===!1?!1:(n.includes(t)||this.#ae([t],t,!1),this.#Pe(t),this.#i={draggedPaths:r,primaryPath:t,target:null},this.#De(),!0)}setDragTarget(e){let t=this.#i;if(t==null)return;let n=e;if(n!=null){let e=we(t.draggedPaths,n);(Te(t.draggedPaths,n)||this.#r?.canDrop?.(e)===!1)&&(n=null)}Ce(t.target,n)||(this.#i={...t,target:n},this.#De())}cancelDrag(){this.#i!=null&&(this.#i=null,this.#De())}completeDrag(){let e=this.#i;if(e==null)return!1;this.#i=null;let t=e.target==null?null:{...e.target};if(t==null)return this.#De(),!1;let n=we(e.draggedPaths,t);if(Te(e.draggedPaths,t)||this.#r?.canDrop?.(n)===!1)return this.#De(),!1;let r=Ee(e.draggedPaths,t);if(r==null)return this.#De(),!1;try{if(r.operations.length===1){let e=r.operations[0];if(e==null||e.type!==`move`)throw Error(`Expected a single move operation for one-item drops`);this.#H.move(e.from,e.to,{collision:e.collision})}else this.#ce(r.operations),this.#H.batch(r.operations)}catch(e){return this.#De(),this.#r?.onDropError?.(e instanceof Error?e.message:String(e),n),!1}return this.#r?.onDropComplete?.(r.result),!0}subscribe(e){return this.#t.add(e),e(),()=>{this.#t.delete(e)}}add(e){this.#H.add(e)}remove(e,t={}){this.#H.remove(e,t)}move(e,t,n={}){this.#H.move(e,t,n)}batch(e){this.#H.batch(e)}onMutation(e,t){let n=e,r=t,i=this.#n.get(n);return i??(i=new Set,this.#n.set(n,i)),i.add(r),()=>{let e=this.#n.get(n);e?.delete(r),e?.size===0&&this.#n.delete(n)}}setSearch(e){this.#Te(e,!0)}openSearch(e=``){this.#Te(e,!0)}closeSearch(){this.#Te(null,!0)}isSearchOpen(){return this.#M!==null}getSearchValue(){return this.#M??``}getSearchMatchingPaths(){return this.#k}focusNextSearchMatch(){this.#we(1)}focusPreviousSearchMatch(){this.#we(-1)}startRenaming(e=this.#c??``,t={}){if(!this.#w)return!1;let n=this.#H.getPathInfo(e);if(n==null)return!1;let r=n.path,i=Ve(r),a=We(r);if(this.#C?.({isFolder:i,path:a})===!1)return!1;for(let e of Re(r))this.#H.isExpanded(e)||this.#H.expand(e);return this.#ae([r],r,!1),this.#M!=null&&(this.#Te(null,!1),this.#y?.(this.#M)),this.#Pe(r),this.#T=r,this.#E=Ue(r),this.#D=t.removeIfCanceled??!1,this.#De(),!0}[qe](){return{cancel:()=>{this.#q()},commit:()=>{this.#J()},getPath:()=>this.#T,getValue:()=>this.#E,isActive:()=>this.#T!=null,setValue:e=>{this.#Y(e)}}}#q(){if(this.#T==null)return;let e=this.#T,t=this.#D;if(this.#T=null,this.#E=``,this.#D=!1,t){this.remove(e,Ve(e)?{recursive:!0}:void 0);return}this.#Pe(e),this.#De()}#J(){let e=this.#T;if(e==null)return;if(this.#D&&this.#E.trim().length===0){this.#T=null,this.#E=``,this.#D=!1,this.remove(e,Ve(e)?{recursive:!0}:void 0);return}let t=Ve(e),n=ye({files:this.#H.list(),isFolder:t,nextBasename:this.#E,path:We(e)});if(this.#T=null,this.#E=``,this.#D=!1,`error`in n){this.#Pe(e),this.#v?.(n.error),this.#De();return}if(n.sourcePath===n.destinationPath){this.#Pe(e),this.#De();return}this.#_?.({destinationPath:n.destinationPath,isFolder:n.isFolder,sourcePath:n.sourcePath}),this.move(Ge(n.sourcePath,t),Ge(n.destinationPath,t))}#Y(e){this.#T==null||this.#E===e||(this.#E=e,this.#De())}resetPaths(e,t={}){let n=this.#H.list().length,r=this.#G,i=Oe({paths:e,preparedInput:t.preparedInput},`resetPaths`,this.#e.sort),a=this.#le(i.paths,i.preparedInput,t.initialExpandedPaths),o=this.#c,s=this.#T,c=this.getSelectedPaths(),l=this.#z;this.#K?.(),this.#H=a,this.#d.clear(),this.#he();let u=c.map(e=>a.getPathInfo(e)?.path??null).filter(e=>e!=null),d=!Le(this.#B,u);this.#B=new Set(u),d&&(this.#V+=1),this.#z=l==null?null:a.getPathInfo(l)?.path??null,this.#T=s==null?null:a.getPathInfo(s)?.path??null,this.#T??(this.#E=``,this.#D=!1),this.#je(o,o!=null||u.length>0||this.#z!=null),this.#K=this.#Re(),this.#De(),this.#Oe({canonicalChanged:!0,operation:`reset`,pathCountAfter:i.paths.length,pathCountBefore:n,projectionChanged:!0,usedPreparedInput:t.preparedInput!=null,visibleCountDelta:this.#G-r})}#X(e){this.#Ie();let t=ze(e),n=Be(e,t),r=null,i=null;for(let e of this.#be()){if(ze(e)!==t)continue;let a=Be(e,t);if(a<n){r=e;continue}if(a>n){i=e;break}}return r??i}#Z(e){let t=this.#Ce(e);if(t!==-1)return t;let n=Re(e);for(let e=n.length-1;e>=0;--e){let t=n[e];if(t==null)continue;let r=this.#Ce(t);if(r!==-1)return r}return this.#be().length>0?0:-1}#Q(e,t){let n=this.#d.get(e);if(n!=null)return n;let r=t??this.#H.getPathInfo(e);if(r==null)return null;let i=r.kind===`directory`?this.#oe(r.path):this.#se(r.path);return this.#d.set(r.path,i),i}#$(e,t,n,r){return{ancestorPaths:r.ancestorPaths,depth:e.depth,flattenedSegments:e.flattenedSegments?.map(e=>({isTerminal:e.isTerminal,name:e.name,path:e.path})),hasChildren:e.hasChildren,index:t,isExpanded:e.isExpanded,isFlattened:e.isFlattened,isFocused:r.path===this.#c,isSelected:this.#B.has(r.path),kind:e.kind,level:e.depth,name:e.name,path:r.path,posInSet:r.posInSet??this.#x[n]??0,setSize:r.setSize??this.#S[n]??0}}#ee(e){return this.#$(e.row,e.index,e.index,{ancestorPaths:e.ancestorPaths,path:e.row.path,posInSet:e.posInSet,setSize:e.setSize})}#te(e,t){let n=this.#H.getVisibleRowContext(e);return n==null?void 0:n.ancestorRows[t]??(t===n.ancestorRows.length&&n.row.kind===`directory`&&n.row.isExpanded?n:void 0)}#ne(e){let t=this.#a.get(e);if(t!=null)return t;let n=this.#u(e),r=n<0?[]:[...this.#ne(n),n];return this.#a.set(e,r),r}#re(e){let t=this.#o.get(e);if(t!=null)return t;let n=this.#ne(e).map(e=>this.#b[e]??``).filter(e=>e!==``);return this.#o.set(e,n),n}#ie(e){this.#H.collapse(e)}#ae(e,t=this.#z,n=!0){let r=[...new Set(e)],i=!Le(this.#B,r),a=this.#z!==t;!i&&!a||(this.#B=new Set(r),this.#z=t,i&&(this.#V+=1),n&&this.#De())}#oe(e){return{collapse:()=>{this.#ie(e)},deselect:()=>{this.deselectPath(e)},expand:()=>{this.#ke(e)},focus:()=>{this.focusPath(e)},getPath:()=>e,isDirectory:()=>!0,isExpanded:()=>this.#H.isExpanded(e),isFocused:()=>this.#c===e,isSelected:()=>this.#B.has(e),select:()=>{this.selectPath(e)},toggleSelect:()=>{this.togglePathSelection(e)},toggle:()=>{this.#ze(e)}}}#se(e){return{deselect:()=>{this.deselectPath(e)},focus:()=>{this.focusPath(e)},getPath:()=>e,isDirectory:()=>!1,isFocused:()=>this.#c===e,isSelected:()=>this.#B.has(e),select:()=>{this.selectPath(e)},toggleSelect:()=>{this.togglePathSelection(e)}}}#ce(e){let t=this.#H.list();this.#le(t).batch(e)}#le(e,t,n){return new S({...this.#e,paths:e,preparedInput:t??void 0,...n===void 0?{}:{initialExpandedPaths:n}})}#ue(){return this.#h??=this.#H.list(),this.#h}#de(){if(this.#m!=null)return this.#m;let e=new Set;for(let t of this.#ue()){e.add(t);for(let n of Re(t))e.add(n)}return this.#m=[...e].sort(),this.#m}#fe(){return this.#g??=this.#ue().map(He),this.#g}#pe(){return this.#f??=this.#de().filter(e=>e.endsWith(`/`)),this.#f}#me(){return this.#p??=this.#pe().map(He),this.#p}#he(){this.#f=null,this.#p=null,this.#m=null,this.#h=null,this.#g=null}#ge(){return this.#pe().filter(e=>this.#H.isExpanded(e))}#_e(e){let t=new Set(this.#j??[]);if(e)for(let e of this.#B)for(let n of Re(e))t.add(n);this.#ve(t)}#ve(e){this.#W=!0;try{for(let t of this.#pe()){let n=e.has(t),r=this.#H.isExpanded(t);n&&!r?this.#H.expand(t):!n&&r&&this.#H.collapse(t)}}finally{this.#W=!1}}#ye(){if(this.#M==null||this.#M.length===0){this.#k=[],this.#F=null,this.#I=null,this.#P=null,this.#G=this.#U;return}let e=this.#b;if(this.#k=e.filter(e=>this.#O.has(e)),this.#A!==`hide-non-matches`||this.#O.size===0){this.#F=null,this.#I=null,this.#P=null,this.#G=this.#U;return}let t=[],n=[],r=new Map;for(let[i,a]of e.entries())this.#N?.has(a)===!0&&(r.set(a,n.length),t.push(i),n.push(a));this.#F=t,this.#I=n,this.#P=r,this.#G=n.length}#be(){return this.#I??this.#b}#xe(e){return this.#I==null?this.#H.getVisibleIndex(e)??-1:this.#P?.get(e)??-1}#Se(e){return this.#F?.[e]??e}#Ce(e){return this.#P?.get(e)??this.#H.getVisibleIndex(e)??-1}#we(e){let t=this.#k;if(t.length===0)return;let n=this.#c,r=n==null?-1:t.indexOf(n),i=t[r<0?e>0?0:t.length-1:Math.min(t.length-1,Math.max(0,r+e))];i!=null&&this.focusPath(i)}#Te(e,t){let n=e==null?null:Ke(e),r=this.#M;if(r!==n){if(r==null&&n!=null&&(this.#j=this.#ge()),this.#M=n,n==null)this.#_e(!0),this.#j=null,this.#O.clear(),this.#N=null,this.#je(this.#c,!0);else if(n.length===0)this.#_e(!1),this.#O.clear(),this.#N=null,this.#je(this.#c,!0);else{let e=this.#Ee();this.#je(e,!0)}t&&(this.#y?.(this.#M),this.#De())}}#Ee(){if(this.#M==null||this.#M.length===0)return this.#O.clear(),this.#c;let e=this.#M,t=this.#ue(),n=this.#fe(),r=[],i=new Set,a=null;for(let o=0;o<t.length;o+=1){if(!n[o].includes(e))continue;let s=t[o];r.push(s),i.add(s),a??=s}let o=this.#pe(),s=this.#me();for(let t=0;t<o.length;t+=1){if(!s[t].includes(e))continue;let n=o[t];i.has(n)||(r.push(n),i.add(n),a??=n)}this.#O=i;let c=this.#A===`hide-non-matches`&&r.length>0?new Set:null;this.#N=c;let l=this.#A===`expand-matches`?new Set(this.#j??[]):new Set;for(let e of r){c?.add(e),e.endsWith(`/`)&&l.add(e);for(let t of Re(e))l.add(t),c?.add(t)}return this.#ve(l),a??this.#c}#De(){for(let e of this.#t)e()}#Oe(e){this.#n.get(e.operation)?.forEach(t=>{t(e)}),this.#n.get(`*`)?.forEach(t=>{t(e)})}#ke(e){for(let t of Re(e))this.#H.isExpanded(t)||this.#H.expand(t);this.#H.isExpanded(e)||this.#H.expand(e)}#Ae(e){let t=this.#G;if(t===0)return;let n=this.#s===-1?0:this.#s,r=Math.min(t-1,Math.max(0,n+e));(r!==n||this.#s===-1)&&(!this.#l&&this.#F==null&&r>=this.#b.length&&this.#Ie(),this.#Fe(r))}#je(e,t=!0){let n=this.#H.getVisibleCount();this.#U=n;let r=Qe(this.#H.getVisibleTreeProjectionData(t?void 0:Math.min(n,Je)),e,t?e=>this.#H.getVisibleIndex(e):void 0);this.#a.clear(),this.#o.clear(),this.#l=r.paths.length>=n,this.#u=r.getParentIndex,this.#b=r.paths,this.#x=r.posInSetByIndex,this.#S=r.setSizeByIndex,this.#ye(),this.#s=e==null?this.#be().length>0?0:-1:this.#Z(e),this.#c=this.#s<0?null:this.#Me(this.#s)}#Me(e){return this.#be()[e]??(this.#F==null?this.#H.getVisibleRowContext(e)?.row.path??null:null)}#Ne(e){return this.#H.getPathInfo(e)?.path??null}#Pe(e){if(e==null)return;let t=this.#Z(e);t>=0&&this.#Fe(t,!1)}#Fe(e,t=!0){let n=this.#Me(e);n!=null&&(this.#s===e&&this.#c===n||(this.#s=e,this.#c=n,t&&this.#De()))}#Ie(){this.#l||this.#je(this.#c,!0)}#Le(e){let t=Me(this.#T,e);t==null&&this.#T!=null&&(this.#E=``),this.#T=t;let n=Me(this.#c,e,!0),r=[...this.#B].map(t=>Me(t,e)).filter(e=>e!=null).map(e=>this.#H.getPathInfo(e)?.path??null).filter(e=>e!=null),i=Me(this.#z,e),a=i==null?null:this.#H.getPathInfo(i)?.path??null,o=[...new Set(r)];return Le(this.#B,o)||(this.#B=new Set(o),this.#V+=1),this.#z=a,n}#Re(){return this.#H.on(`*`,e=>{if(this.#W)return;e.canonicalChanged&&(this.#d.clear(),this.#he()),this.#i!=null&&ke(e)&&(this.#i=null);let t=ke(e)?this.#Le(e):this.#c,n=this.#M!=null&&this.#M.length>0?this.#Ee():this.#M===``?this.#c:t,r=this.#M!=null||e.operation!==`expand`&&e.operation!==`collapse`;this.#je(n,r),this.#De();let i=Ie(e);i!=null&&this.#Oe(i)})}#ze(e){if(this.#H.isExpanded(e)){this.#ie(e);return}this.#ke(e)}},et=e=>{if(e==null||e.length===0)return`0`;let t=`${e.length}`;for(let n of e)t+=`\0${n.path}\0${n.status}`;return t};function tt(e){let t=e.endsWith(`/`),n=``,r=-1;for(let t=0;t<=e.length;t+=1){if(!(e[t]===`/`||t===e.length)){r===-1&&(r=t);continue}r!==-1&&(n!==``&&(n+=`/`),n+=e.slice(r,t),r=-1)}return n===``?null:{isDirectory:t,path:n}}function nt(e){let t=e.endsWith(`/`)?e.slice(0,-1):e;if(t.length===0)return[];let n=t.split(`/`);return n.slice(0,-1).map((e,t)=>`${n.slice(0,t+1).join(`/`)}/`)}function rt(e,t){return t?`${e}/`:e}function it(e,t=null){let n=et(e==null?void 0:[...e]);if(n===`0`)return null;if(t?.signature===n)return t;let r=new Map,i=new Set,a=new Set;for(let t of e??[]){let e=tt(t.path);if(e==null)continue;let n=rt(e.path,e.isDirectory);r.set(n,t.status),t.status===`ignored`&&e.isDirectory?a.add(n):e.isDirectory&&a.delete(n);for(let t of nt(e.path))i.add(t)}return{directoriesWithChanges:i,ignoredDirectoryPaths:a,signature:n,statusByPath:r}}var V,at,H,ot,U,W,st,ct,lt,ut,dt={},ft=[],pt=Array.isArray,mt=ft.slice,ht=Object.assign;function G(e){e&&e.parentNode&&e.remove()}function gt(e,t,n){var r,i,a,o={};for(a in t)a==`key`?r=t[a]:a==`ref`&&typeof e!=`function`?i=t[a]:o[a]=t[a];return arguments.length>2&&(o.children=arguments.length>3?mt.call(arguments,2):n),K(e,o,r,i,null)}function K(e,t,n,r,i){var a={type:e,props:t,key:n,ref:r,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:i??++at,__i:-1,__u:0};return i==null&&V.vnode!=null&&V.vnode(a),a}function q(e){return e.children}function _t(e,t){this.props=e,this.context=t,this.__g=0}function vt(e,t){if(t==null)return e.__?vt(e.__,e.__i+1):null;for(var n;t<e.__k.length;t++)if((n=e.__k[t])!=null&&n.__e!=null)return n.__e;return typeof e.type==`function`?vt(e):null}function yt(e){var t,n;if((e=e.__)!=null&&e.__c!=null){for(e.__e=null,t=0;t<e.__k.length;t++)if((n=e.__k[t])!=null&&n.__e!=null){e.__e=n.__e;break}return yt(e)}}function bt(e){(8&e.__g||!(e.__g|=8)||!H.push(e)||U++)&&ot==V.debounceRendering||((ot=V.debounceRendering)||queueMicrotask)(xt)}function xt(){for(var e,t,n,r,i,a,o,s,c=1;H.length;)H.length>c&&H.sort(W),e=H.shift(),c=H.length,8&e.__g&&(n=void 0,i=(r=(t=e).__v).__e,a=[],o=[],(s=t.__P)&&((n=ht({},r)).__v=r.__v+1,V.vnode&&V.vnode(n),kt(s,n,r,t.__n,s.namespaceURI,32&r.__u?[i]:null,a,i??vt(r),!!(32&r.__u),o,s.ownerDocument),n.__v=r.__v,n.__.__k[n.__i]=n,jt(a,n,o),n.__e!=i&&yt(n)));U=0}function St(e,t,n,r,i,a,o,s,c,l,u,d){var f,p,m,h,g,_,v,y=r&&r.__k||ft,b=t.length;for(c=Ct(n,t,y,c,b),f=0;f<b;f++)(m=n.__k[f])!=null&&(p=m.__i==-1?dt:y[m.__i]||dt,m.__i=f,_=kt(e,m,p,i,a,o,s,c,l,u,d),h=m.__e,m.ref&&p.ref!=m.ref&&(p.ref&&Pt(p.ref,null,m),u.push(m.ref,m.__c||h,m)),g==null&&h!=null&&(g=h),(v=!!(4&m.__u))||p.__k===m.__k?c=wt(m,c,e,v):typeof m.type==`function`&&_!==void 0?c=_:h&&(c=h.nextSibling),m.__u&=-7);return n.__e=g,c}function Ct(e,t,n,r,i){var a,o,s,c,l,u=n.length,d=u,f=0;for(e.__k=Array(i),a=0;a<i;a++)(o=t[a])!=null&&typeof o!=`boolean`&&typeof o!=`function`?(c=a+f,(o=e.__k[a]=typeof o==`string`||typeof o==`number`||typeof o==`bigint`||o.constructor==String?K(null,o,null,null,null):pt(o)?K(q,{children:o},null,null,null):o.constructor==null&&o.__b>0?K(o.type,o.props,o.key,o.ref?o.ref:null,o.__v):o).__=e,o.__b=e.__b+1,s=null,(l=o.__i=Tt(o,n,c,d))!=-1&&(d--,(s=n[l])&&(s.__u|=2)),s==null||s.__v==null?(l==-1&&(i>u?f--:i<u&&f++),typeof o.type!=`function`&&(o.__u|=4)):l!=c&&(l==c-1?f--:l==c+1?f++:(l>c?f--:f++,o.__u|=4))):e.__k[a]=null;if(d)for(a=0;a<u;a++)(s=n[a])!=null&&!(2&s.__u)&&(s.__e==r&&(r=vt(s)),Ft(s,s));return r}function wt(e,t,n,r){var i,a;if(typeof e.type==`function`){for(i=e.__k,a=0;i&&a<i.length;a++)i[a]&&(i[a].__=e,t=wt(i[a],t,n,r));return t}e.__e!=t&&(r&&(t&&e.type&&!t.parentNode&&(t=vt(e)),n.insertBefore(e.__e,t||null)),t=e.__e);do t&&=t.nextSibling;while(t!=null&&t.nodeType==8);return t}function Tt(e,t,n,r){var i,a,o,s=e.key,c=e.type,l=t[n],u=l!=null&&(2&l.__u)==0;if(l===null&&e.key==null||u&&s==l.key&&c==l.type)return n;if(r>(u?1:0)){for(i=n-1,a=n+1;i>=0||a<t.length;)if((l=t[o=i>=0?i--:a++])!=null&&!(2&l.__u)&&s==l.key&&c==l.type)return o}return-1}function Et(e,t,n){t[0]==`-`?e.setProperty(t,n??``):e[t]=n??``}function Dt(e,t,n,r,i){var a;n:if(t==`style`)if(typeof n==`string`)e.style.cssText=n;else{if(typeof r==`string`&&(e.style.cssText=r=``),r)for(t in r)n&&t in n||Et(e.style,t,``);if(n)for(t in n)r&&n[t]==r[t]||Et(e.style,t,n[t])}else if(t[0]==`o`&&t[1]==`n`)a=t!=(t=t.replace(st,`$1`)),(t=t.slice(2))[0].toLowerCase()!=t[0]&&(t=t.toLowerCase()),e.__l||={},e.__l[t+a]=n,n?r?n.l=r.l:(n.l=ct,e.addEventListener(t,a?ut:lt,a)):e.removeEventListener(t,a?ut:lt,a);else{if(i==`http://www.w3.org/2000/svg`)t=t.replace(/xlink(H|:h)/,`h`).replace(/sName$/,`s`);else if(t!=`width`&&t!=`height`&&t!=`href`&&t!=`list`&&t!=`form`&&t!=`tabIndex`&&t!=`download`&&t!=`rowSpan`&&t!=`colSpan`&&t!=`role`&&t!=`popover`&&t in e)try{e[t]=n??``;break n}catch{}typeof n==`function`||(n==null||!1===n&&t[4]!=`-`?e.removeAttribute(t):e.setAttribute(t,t==`popover`&&n==1?``:n))}}function Ot(e){return function(t){if(this.__l){var n=this.__l[t.type+e];if(t.u==null)t.u=ct++;else if(t.u<n.l)return;return n(V.event?V.event(t):t)}}}function kt(e,t,n,r,i,a,o,s,c,l,u){var d,f,p,m,h,g,_,v,y,b,x,S,C,w,T,E,D,ee,O,k,A,j=t.type;if(t.constructor!=null)return null;128&n.__u&&(c=!!(32&n.__u),n.__c.__z&&(s=t.__e=n.__e=(a=n.__c.__z)[0],n.__c.__z=null)),(d=V.__b)&&d(t);n:if(typeof j==`function`)try{if(v=t.props,y=`prototype`in j&&j.prototype.render,b=(d=j.contextType)&&r[d.__c],x=d?b?b.props.value:d.__:r,n.__c?2&(f=t.__c=n.__c).__g&&(f.__g|=1,_=!0):(y?t.__c=f=new j(v,x):(t.__c=f=new _t(v,x),f.constructor=j,f.render=It),b&&b.sub(f),f.props=v,f.state||={},f.context=x,f.__n=r,p=!0,f.__g|=8,f.__h=[],f._sb=[]),y&&f.__s==null&&(f.__s=f.state),y&&j.getDerivedStateFromProps!=null&&(f.__s==f.state&&(f.__s=ht({},f.__s)),ht(f.__s,j.getDerivedStateFromProps(v,f.__s))),m=f.props,h=f.state,f.__v=t,p)y&&j.getDerivedStateFromProps==null&&f.componentWillMount!=null&&f.componentWillMount(),y&&f.componentDidMount!=null&&f.__h.push(f.componentDidMount);else{if(y&&j.getDerivedStateFromProps==null&&v!==m&&f.componentWillReceiveProps!=null&&f.componentWillReceiveProps(v,x),!(4&f.__g)&&f.shouldComponentUpdate!=null&&!1===f.shouldComponentUpdate(v,f.__s,x)||t.__v==n.__v){for(t.__v!=n.__v&&(f.props=v,f.state=f.__s,f.__g&=-9),t.__e=n.__e,t.__k=n.__k,t.__k.some(function(e){e&&(e.__=t)}),S=0;S<f._sb.length;S++)f.__h.push(f._sb[S]);f._sb=[],f.__h.length&&o.push(f);break n}f.componentWillUpdate!=null&&f.componentWillUpdate(v,f.__s,x),y&&f.componentDidUpdate!=null&&f.__h.push(function(){f.componentDidUpdate(m,h,g)})}if(f.context=x,f.props=v,f.__P=e,f.__g&=-5,C=V.__r,w=0,y){for(f.state=f.__s,f.__g&=-9,C&&C(t),d=f.render(f.props,f.state,f.context),T=0;T<f._sb.length;T++)f.__h.push(f._sb[T]);f._sb=[]}else do f.__g&=-9,C&&C(t),d=f.render(f.props,f.state,f.context),f.state=f.__s;while(8&f.__g&&++w<25);f.state=f.__s,f.getChildContext!=null&&(r=ht({},r,f.getChildContext())),y&&!p&&f.getSnapshotBeforeUpdate!=null&&(g=f.getSnapshotBeforeUpdate(m,h)),E=d,d!=null&&d.type===q&&d.key==null&&(E=Mt(d.props.children)),s=St(e,pt(E)?E:[E],t,n,r,i,a,o,s,c,l,u),t.__u&=-161,f.__h.length&&o.push(f),_&&(f.__g&=-4)}catch(e){if(t.__v=null,c||a!=null)if(e.then){for(D=0,ee=!1,t.__u|=c?160:128,t.__c.__z=[],O=0;O<a.length;O++)(k=a[O])==null||ee||(k.nodeType==8&&k.data==`$s`?(D>0&&t.__c.__z.push(k),D++,a[O]=null):k.nodeType==8&&k.data==`/$s`?(--D>0&&t.__c.__z.push(k),ee=D===0,s=a[O],a[O]=null):D>0&&(t.__c.__z.push(k),a[O]=null));if(!ee){for(;s&&s.nodeType==8&&s.nextSibling;)s=s.nextSibling;a[a.indexOf(s)]=null,t.__c.__z=[s]}t.__e=s}else{for(A=a.length;A--;)G(a[A]);At(t)}else t.__e=n.__e,t.__k=n.__k,e.then||At(t);V.__e(e,t,n)}else s=t.__e=Nt(n.__e,t,n,r,i,a,o,c,l,u);return(d=V.diffed)&&d(t),128&t.__u?void 0:s}function At(e){e&&e.__c&&(e.__c.__g|=4),e&&e.__k&&e.__k.forEach(At)}function jt(e,t,n){for(var r=0;r<n.length;r++)Pt(n[r],n[++r],n[++r]);V.__c&&V.__c(t,e),e.some(function(t){try{e=t.__h,t.__h=[],e.some(function(e){e.call(t)})}catch(e){V.__e(e,t.__v)}})}function Mt(e){return typeof e!=`object`||!e||e.__b&&e.__b>0?e:pt(e)?e.map(Mt):ht({},e)}function Nt(e,t,n,r,i,a,o,s,c,l){var u,d,f,p,m,h,g,_,v=n.props,y=t.props,b=t.type;if(b==`svg`?i=`http://www.w3.org/2000/svg`:b==`math`?i=`http://www.w3.org/1998/Math/MathML`:i||=`http://www.w3.org/1999/xhtml`,a!=null){for(u=0;u<a.length;u++)if((m=a[u])&&`setAttribute`in m==!!b&&(b?m.localName==b:m.nodeType==3)){e=m,a[u]=null;break}}if(e==null){if(b==null)return l.createTextNode(y);e=l.createElementNS(i,b,y.is&&y),s&&=(V.__m&&V.__m(t,a),!1),a=null}if(b==null)v===y||s&&e.data==y||(e.data=y);else{if(a&&=mt.call(e.childNodes),v=n.props||dt,!s&&a!=null)for(v={},u=0;u<e.attributes.length;u++)v[(m=e.attributes[u]).name]=m.value;for(u in v)if(m=v[u],u!=`children`){if(u==`dangerouslySetInnerHTML`)f=m;else if(!(u in y)){if(u==`value`&&`defaultValue`in y||u==`checked`&&`defaultChecked`in y)continue;Dt(e,u,null,m,i)}}for(u in _=1&n.__u,y)m=y[u],u==`children`?p=m:u==`dangerouslySetInnerHTML`?d=m:u==`value`?h=m:u==`checked`?g=m:s&&typeof m!=`function`||v[u]===m&&!_||Dt(e,u,m,v[u],i);if(d)s||f&&(d.__html==f.__html||d.__html==e.innerHTML)||(e.innerHTML=d.__html),t.__k=[];else if(f&&(e.innerHTML=``),St(b==`template`?e.content:e,pt(p)?p:[p],t,n,r,b==`foreignObject`?`http://www.w3.org/1999/xhtml`:i,a,o,a?a[0]:n.__k&&vt(n,0),s,c,l),a!=null)for(u=a.length;u--;)G(a[u]);s||(u=`value`,b==`progress`&&h==null?e.removeAttribute(`value`):h==null||h===e[u]&&(b!==`progress`||h)||Dt(e,u,h,v[u],i),u=`checked`,g!=null&&g!=e[u]&&Dt(e,u,g,v[u],i))}return e}function Pt(e,t,n){try{if(typeof e==`function`){var r=typeof e.__u==`function`;r&&e.__u(),r&&t==null||(e.__u=e(t))}else e.current=t}catch(e){V.__e(e,n)}}function Ft(e,t,n){var r,i;if(V.unmount&&V.unmount(e),(r=e.ref)&&(r.current&&r.current!=e.__e||Pt(r,null,t)),(r=e.__c)!=null){if(r.componentWillUnmount)try{r.componentWillUnmount()}catch(e){V.__e(e,t)}r.__P=null}if(r=e.__k)for(i=0;i<r.length;i++)r[i]&&Ft(r[i],t,n||typeof e.type!=`function`);n||G(e.__e),e.__e&&e.__e.__l&&(e.__e.__l=null),e.__e=e.__c=e.__=null}function It(e,t,n){return this.constructor(e,n)}function Lt(e,t){var n,r,i,a;t==document&&(t=document.documentElement),V.__&&V.__(e,t),r=(n=!!(e&&32&e.__u))?null:t.__k,e=t.__k=gt(q,null,[e]),i=[],a=[],kt(t,e,r||dt,dt,t.namespaceURI,r?null:t.firstChild?mt.call(t.childNodes):null,i,r?r.__e:t.firstChild,n,a,t.ownerDocument),jt(i,e,a)}function Rt(e,t){e.__u|=32,Lt(e,t)}V={__e:function(e,t,n,r){for(var i,a,o;t=t.__;)if((i=t.__c)&&!(1&i.__g)){i.__g|=4;try{if((a=i.constructor)&&a.getDerivedStateFromError!=null&&(i.setState(a.getDerivedStateFromError(e)),o=8&i.__g),i.componentDidCatch!=null&&(i.componentDidCatch(e,r||{}),o=8&i.__g),o)return void(i.__g|=2)}catch(t){e=t}}throw U=0,e}},at=0,_t.prototype.setState=function(e,t){var n=this.__s!=null&&this.__s!=this.state?this.__s:this.__s=ht({},this.state);typeof e==`function`&&(e=e(ht({},n),this.props)),e&&ht(n,e),e!=null&&this.__v&&(t&&this._sb.push(t),bt(this))},_t.prototype.forceUpdate=function(e){this.__v&&(this.__g|=4,e&&this.__h.push(e),bt(this))},_t.prototype.render=q,H=[],U=0,W=function(e,t){return e.__v.__b-t.__v.__b},st=/(PointerCapture)$|Capture$/i,ct=0,lt=Ot(!1),ut=Ot(!0);var zt=0;Array.isArray;function J(e,t,n,r,i,a){t||={};var o,s,c=t;if(`ref`in c&&typeof e!=`function`)for(s in c={},t)s==`ref`?o=t[s]:c[s]=t[s];var l={type:e,props:c,key:n,ref:o,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:--zt,__i:-1,__u:0,__source:i,__self:a};return V.vnode&&V.vnode(l),l}var Bt=16,Vt=16,Ht={};function Ut({name:e,remappedFrom:t,token:n,width:r,height:i,viewBox:a,label:o,alignCapitals:s=!1}){"use no memo";let c=`#${e.replace(/^#/,``)}`,{width:l,height:u,viewBox:d}=Ht[e]??{width:Bt,height:Vt},f=r??l,p=i??u,m=a??d??`0 0 ${l} ${u}`,h=o==null?{"aria-hidden":!0}:{"aria-label":o,role:`img`};return J(`svg`,{"data-icon-name":t??e,"data-icon-token":n,"data-align-capitals":s,...h,viewBox:m,width:f,height:p,children:J(`use`,{href:c})})}var Wt=e=>{if(e.length<2)return[e,``];let t=Math.ceil(e.length/2);return[e.slice(0,t),e.slice(t)]},Gt=e=>{if(e.length<4)return[e,``];let t=e.lastIndexOf(`.`)+1,n=e.length-t>10,r=t>=1&&!n?t:Math.ceil(e.length/2);return[e.slice(0,r),e.slice(r)]},Kt=e=>{if(e.length<4)return[e,``];let t=e.lastIndexOf(`/`)+1,n=e.length-t>25,r=t>=1&&!n?t:Math.ceil(e.length/2);return[e.slice(0,r),e.slice(r)]},qt=(e,{splitIndex:t}={})=>{if(typeof t!=`number`){let t=Math.ceil(e.length/2);return[e.slice(0,t),e.slice(t)]}return[e.slice(0,t),e.slice(t)]},Jt=(e,{splitOffset:t}={})=>{if(typeof t!=`number`||t<=0||t>=e.length){let t=Math.ceil(e.length/2);return[e.slice(0,t),e.slice(t)]}let n=e.length-t;return[e.slice(0,n),e.slice(n)]},Yt=(e,{splitOffset:t}={})=>{if(typeof t!=`number`||t<=0||t>=e.length){let t=Math.ceil(e.length/2);return[e.slice(0,t),e.slice(t)]}let n=t;return[e.slice(0,n),e.slice(n)]};function Xt({children:e,marker:t,variant:n=`default`}){"use no memo";let r=n===`fade`;return J(`div`,{"aria-hidden":!0,"data-truncate-marker-cell":!0,children:J(`div`,{"data-truncate-marker":!0,children:typeof t==`function`?t({children:e}):r?J(`span`,{"data-truncate-fade":!0}):t})})}function Zt(e){"use no memo";let{mode:t,children:n}=e;return J(`div`,{children:[J(`div`,{"data-truncate-content":`visible`,children:t===`fruncate`?J(`span`,{children:n}):n}),J(`div`,{"data-truncate-content":`overflow`,"aria-hidden":!0,children:t===`fruncate`?J(`span`,{children:n}):n})]})}function Qt({children:e,mode:t=`truncate`,marker:n=`…`,variant:r=`default`,...i}){"use no memo";let a=J(Zt,{mode:t,children:e},`content`),o=J(Xt,{marker:n,mode:t,variant:r},`marker`),s=J(`div`,{"data-truncate-fill":!0},`fill`);return J(`div`,{"data-truncate-container":t,"data-truncate-variant":r,...i,children:J(`div`,{"data-truncate-grid":!0,children:t===`truncate`?[a,o]:[o,a,s]})})}function $t({children:e,...t}){"use no memo";return J(Qt,{mode:`truncate`,...t,children:e})}function en({children:e,...t}){"use no memo";return J(Qt,{mode:`fruncate`,...t,children:e})}function tn({children:e,contents:t,priority:n=`end`,split:r=`center`,minimumLength:i=12,className:a,style:o,...s}){"use no memo";let c=null,l=null;if(Array.isArray(t)){if(t.length!==2)return console.error(`MiddleTruncate: contents must be an array of two items`),null;c=J($t,{...s,children:t[0]}),l=J(en,{...s,children:t[1]})}else{if(typeof e!=`string`)return console.error(`MiddleTruncate: children must be a string`),null;if(e.length===0)return J(`div`,{className:a,style:o});if(e.length<i)return J(n===`end`?en:$t,{...s,className:a,style:o,children:e});let t=null,u=null,d=null;if(typeof r==`string`)r===`center`?t=Wt:r===`extension`?t=Gt:r===`leaf-path`&&(t=Kt);else if(typeof r==`number`)t=qt,u=r;else if(Array.isArray(r)){let[e,n]=r;d=n,e===`last`?t=Jt:e===`first`&&(t=Yt)}else typeof r==`function`&&(t=r);t??=Wt;let[f,p]=t(e,{priority:n,variant:s.variant,splitIndex:typeof u==`number`?u:void 0,splitOffset:typeof d==`number`?d:void 0}),m=f.length>=p.length,h=n===`equal`&&!m,g=n===`equal`&&m,_={},v={};h&&(_.marker=``),g&&(v.marker=``),c=J($t,{...s,..._,children:f}),l=J(en,{...s,...v,children:p})}return J(`div`,{"data-truncate-group-container":`middle`,className:a,style:o,children:[J(`div`,{"data-truncate-segment-priority":n===`start`||n===`equal`?`1`:`2`,children:c}),J(`div`,{"data-truncate-segment-priority":n===`end`||n===`equal`?`1`:`2`,children:l})]})}var nn={endIndex:-1,startIndex:-1};function rn(e,t,n){return Math.min(Math.max(e,t),n)}function an(e,t){return e<0||t<e?nn:{endIndex:t,startIndex:e}}function on(e){return e.startIndex<0||e.endIndex<e.startIndex}function sn(e,t){return on(e)?0:(e.endIndex-e.startIndex+1)*t}function cn(e,t,n){if(t<=0)return-1;let r=t*n;return e<=0?0:e>=r?t:Math.floor(e/n)}function ln(e,t,n){return t<=0||e<=0?-1:e>=t*n?t-1:Math.ceil(e/n)-1}function un(e){let t=new Map;return e.forEach((e,n)=>{if(e.kind!==`directory`||!e.isExpanded)return;let r=e.ancestorPaths.length,i=t.get(r);if(i==null){t.set(r,[n]);return}i.push(n)}),t}function dn(e,t){let n=0,r=e.length-1,i=-1;for(;n<=r;){let a=Math.floor((n+r)/2),o=e[a];if(o==null)break;if(o<=t){i=a,n=a+1;continue}r=a-1}return i}function fn(e){let t=new Map,n=[];for(let r=0;r<e.length;r+=1){let i=e[r];if(i==null)continue;let a=i.kind===`directory`&&i.isExpanded?[...i.ancestorPaths,i.path]:i.ancestorPaths,o=0;for(;o<n.length&&o<a.length&&n[o]===a[o];)o+=1;for(let e=n.length-1;e>=o;--e){let i=n[e];i!=null&&t.set(i,r-1)}n.length=o;for(let e=o;e<a.length;e+=1){let t=a[e];t!=null&&n.push(t)}}let r=e.length-1;for(let e of n)t.set(e,r);return t}function pn(e,t,n){if(e.length===0||t<=0)return[];let r=fn(e),i=un(e),a=[];for(let r=0;r<e.length;r+=1){let o=i.get(r);if(o==null||o.length===0)break;let s=t+r*n,c=dn(o,Math.min(e.length-1,Math.floor(s/n))),l=null;for(;c>=0;){let t=o[c],n=t==null?null:e[t]??null;if(n!=null&&(r===0||n.ancestorPaths[r-1]===a[r-1]?.path)){l=n;break}--c}if(l==null)break;a.push(l)}return a.map((i,a)=>{let o=a*n,s=(r.get(i.path)??e.length-1)+1;if(s>=e.length)return{row:i,top:o};let c=s*n-t;return{row:i,top:Math.min(o,c-n)}}).filter(e=>e.top+n>0)}function mn(e,t){let n=t.totalRowCount??e.length,r=n*t.itemHeight,i=Math.max(0,t.viewportHeight),a=Math.max(0,Math.floor(t.overscan)),o=Math.max(0,r-i),s=rn(t.scrollTop,0,o),c=t.stickyRows??pn(e,s,t.itemHeight),l=c.reduce((e,n)=>Math.max(e,n.top+t.itemHeight),0),u=Math.min(r,s+l),d=Math.max(0,i-l),f=Math.max(0,r-u),p=cn(s,n,t.itemHeight),m=cn(u,n,t.itemHeight),h=l<=0||p<0||p>=n?-1:p,g=h===-1?-1:Math.min(n-1,m-1),_=h===-1||g<h?0:g-h+1,v=d<=0||m>=n?nn:an(m,ln(u+d,n,t.itemHeight)),y=g+1,b=on(v)?nn:an(Math.max(y,v.startIndex-a),Math.min(n-1,v.endIndex+a)),x=sn(b,t.itemHeight);return{occlusion:{firstOccludedIndex:h,lastOccludedIndex:g,occludedCount:_},physical:{itemHeight:t.itemHeight,maxScrollTop:o,overscan:a,scrollTop:s,totalHeight:r,totalRowCount:n,viewportHeight:i},projected:{contentHeight:f,paneHeight:d,paneTop:u},sticky:{height:l,rows:c},visible:v,window:{endIndex:b.endIndex,height:x,offsetTop:on(b)?0:b.startIndex*t.itemHeight,startIndex:b.startIndex}}}var hn={added:`A`,deleted:`D`,ignored:null,modified:`M`,renamed:`R`,untracked:`U`},gn={added:`Git status: added`,deleted:`Git status: deleted`,ignored:`Git status: ignored`,modified:`Git status: modified`,renamed:`Git status: renamed`,untracked:`Git status: untracked`},_n=`Contains git status items`;function vn(e){let{currentScrollTop:t,focusedIndex:n,itemHeight:r,topInset:i=0,viewportHeight:a}=e;if(n<0)return null;let o=Math.max(0,i),s=n*r,c=s+r;if(s<t+o){let e=Math.max(0,s-o);return e===t?null:e}if(c>t+a){let e=c-a;return e===t?null:e}return null}function yn(e){let{currentScrollTop:t,focusedIndex:n,itemHeight:r,offset:i,topInset:a=0,totalHeight:o,viewportHeight:s}=e;if(i===`nearest`)return vn({currentScrollTop:t,focusedIndex:n,itemHeight:r,topInset:a,viewportHeight:s});if(n<0)return null;let c=Math.max(0,a),l=n*r,u=Math.max(0,s-c),d=i===`center`?c+Math.max(0,(u-r)/2):c,f=Math.max(0,o-s),p=Math.max(0,Math.min(l-d,f));return p===t?null:p}function bn(e){let{currentScrollTop:t,focusedIndex:n,itemHeight:r,targetViewportOffset:i,totalHeight:a,viewportHeight:o}=e;if(n<0)return null;let s=Math.max(0,i),c=n*r,l=c+r,u=t+s,d=t+o;if(c>=u&&l<=d)return null;let f=Math.max(0,a-o),p=Math.max(0,Math.min(c-s,f));return p===t?null:p}function xn(e){if(e==null||!e.isConnected||e===document.body||e===document.documentElement)return!1;e.focus({preventScroll:!0});let t=e.getRootNode();return t instanceof ShadowRoot?t.activeElement===e:document.activeElement===e}function Sn(e){let t=e.getRootNode();if(t instanceof ShadowRoot){let e=t.activeElement;return e instanceof HTMLElement?e:null}let n=document.activeElement;return n instanceof HTMLElement&&e.contains(n)?n:null}function Cn(e,t){if(e==null)return t;let n=e.getBoundingClientRect().height;return n>0?n:e.clientHeight>0?e.clientHeight:t}function wn(e,t){return e!=null&&e>0?e:t}function Tn(e){let t=e.borderBoxSize,n=Array.isArray(t)?t[0]:t;return n!=null&&Number.isFinite(n.blockSize)&&n.blockSize>0?n.blockSize:e.contentRect.height>0?e.contentRect.height:null}function En(e,t,n,r,i=0){let a=vn({currentScrollTop:e.scrollTop,focusedIndex:t,itemHeight:n,topInset:i,viewportHeight:r});return a==null?!1:(e.scrollTop=a,!0)}function Dn(e,t,n,r,i,a,o=0){let s=yn({currentScrollTop:e.scrollTop,focusedIndex:t,itemHeight:n,offset:a,topInset:o,totalHeight:i,viewportHeight:r});return s==null?!1:(e.scrollTop=s,!0)}function On(e,t,n,r,i,a){let o=bn({currentScrollTop:e.scrollTop,focusedIndex:t,itemHeight:n,targetViewportOffset:a,totalHeight:i,viewportHeight:r});return o==null?!1:(e.scrollTop=o,!0)}function kn(e,t,n,r){return n.end<n.start?null:e<n.start?-t:e>n.end?r:null}function An(e){let{renamingPath:t,previousRenamingPath:n,hasRenderedInput:r}=e;return t==null?`reset`:r?n===t?`ignore`:`focus-input`:`reveal-canonical`}function jn({ariaLabel:e,isFlattened:t=!1,ref:n,value:r,onBlur:i,onInput:a}){return J(`input`,{ref:n,"data-item-rename-input":!0,...t?{"data-item-flattened-rename-input":!0}:{},"aria-label":e,value:r,onBlur:i,onInput:a,onClick:e=>e.stopPropagation(),onMouseDown:e=>e.stopPropagation(),onPointerDown:e=>e.stopPropagation()})}function Mn(e){let{row:t,mode:n,targetPath:r,ariaLabel:i,domId:a,isParked:o,itemHeight:s,features:c,state:l,extraStyle:u}=e,d=n===`sticky`,f=t.ancestorPaths.at(-1)??``,p={};return l.isFocusRinged&&(p[`data-item-focused`]=!0),t.isSelected&&(p[`data-item-selected`]=!0),l.isContextHovered&&(p[`data-item-context-hover`]=`true`),l.isDragTarget&&(p[`data-item-drag-target`]=!0),l.isDragging&&(p[`data-item-dragging`]=!0),l.effectiveGitStatus!=null&&(p[`data-item-git-status`]=l.effectiveGitStatus),l.containsGitChange&&(p[`data-item-contains-git-change`]=`true`),{"aria-expanded":!d&&t.kind===`directory`?t.isExpanded:void 0,"aria-haspopup":c.contextMenuEnabled?`menu`:void 0,"aria-label":i,"aria-level":d?void 0:t.level+1,"aria-posinset":d?void 0:t.posInSet+1,"aria-selected":d?void 0:t.isSelected?`true`:`false`,"aria-setsize":d?void 0:t.setSize,"data-file-tree-sticky-path":d?r:void 0,"data-file-tree-sticky-row":d?`true`:void 0,"data-item-context-menu-button-visibility":c.actionLaneEnabled?c.contextMenuButtonVisibility:void 0,"data-item-context-menu-trigger-mode":c.contextMenuEnabled?c.contextMenuTriggerMode:void 0,"data-item-has-context-menu-action-lane":c.actionLaneEnabled?`true`:void 0,"data-item-has-git-lane":c.gitLaneActive?`true`:void 0,"data-item-parent-path":f.length>0?f:void 0,"data-item-parked":o?`true`:void 0,"data-item-path":r,"data-item-type":t.kind===`directory`?`folder`:`file`,"data-type":`item`,id:d?void 0:a,role:d?void 0:`treeitem`,style:{minHeight:`${s}px`,...u},tabIndex:!d&&t.isFocused?0:-1,...p}}function Nn(e){let{event:t,mode:n,isSearchOpen:r,isDirectory:i}=e,a=t.ctrlKey||t.metaKey,o=t.shiftKey||a,s=t.shiftKey?{additive:a,kind:`range`}:a?{kind:`toggle`}:{kind:`single`};return{closeSearch:r,revealCanonical:n===`sticky`,selection:s,toggleDirectory:!o&&i}}var Pn,Y,Fn,In,Ln=Object.is,Rn=0,zn=[],X=V,Bn=X.__b,Vn=X.__r,Hn=X.diffed,Un=X.__c,Wn=X.unmount,Gn=X.__;function Kn(e,t){X.__h&&X.__h(Y,e,Rn||t),Rn=0;var n=Y.__H||={__:[],__h:[]};return e>=n.__.length&&n.__.push({}),n.__[e]}function qn(e){return Rn=1,Jn(ar,e)}function Jn(e,t,n){var r=Kn(Pn++,2);if(r.t=e,!r.__c&&(r.__=[n?n(t):ar(void 0,t),function(e){var t=r.__N?r.__N[0]:r.__[0],n=r.t(t,e);Ln(t,n)||(r.__N=[n,r.__[1]],r.__c.setState({}))}],r.__c=Y,!Y.__f)){var i=function(e,t,n){if(!r.__c.__H)return!0;var i=r.__c.__H.__.filter(function(e){return!!e.__c});if(i.every(function(e){return!e.__N}))return!a||a.call(this,e,t,n);var o=r.__c.props!==e;return i.forEach(function(e){if(e.__N){var t=e.__[0];e.__=e.__N,e.__N=void 0,Ln(t,e.__[0])||(o=!0)}}),a&&a.call(this,e,t,n)||o};Y.__f=!0;var a=Y.shouldComponentUpdate,o=Y.componentWillUpdate;Y.componentWillUpdate=function(e,t,n){if(4&this.__g){var r=a;a=void 0,i(e,t,n),a=r}o&&o.call(this,e,t,n)},Y.shouldComponentUpdate=i}return r.__N||r.__}function Yn(e,t){var n=Kn(Pn++,3);!X.__s&&ir(n.__H,t)&&(n.__=e,n.u=t,Y.__H.__h.push(n))}function Xn(e,t){var n=Kn(Pn++,4);!X.__s&&ir(n.__H,t)&&(n.__=e,n.u=t,Y.__h.push(n))}function Z(e){return Rn=5,Zn(function(){return{current:e}},[])}function Zn(e,t){var n=Kn(Pn++,7);return ir(n.__H,t)&&(n.__=e(),n.__H=t,n.__h=e),n.__}function Qn(e,t){return Rn=8,Zn(function(){return e},t)}function $n(){for(var e;e=zn.shift();)if(e.__P&&e.__H)try{e.__H.__h.forEach(nr),e.__H.__h.forEach(rr),e.__H.__h=[]}catch(t){e.__H.__h=[],X.__e(t,e.__v)}}X.__b=function(e){Y=null,Bn&&Bn(e)},X.__=function(e,t){e&&t.__k&&t.__k.__m&&(e.__m=t.__k.__m),Gn&&Gn(e,t)},X.__r=function(e){Vn&&Vn(e),Pn=0;var t=(Y=e.__c).__H;t&&(Fn===Y?(t.__h=[],Y.__h=[],t.__.forEach(function(e){e.__N&&(e.__=e.__N),e.u=e.__N=void 0})):(t.__h.forEach(nr),t.__h.forEach(rr),t.__h=[],Pn=0)),Fn=Y},X.diffed=function(e){Hn&&Hn(e);var t=e.__c;t&&t.__H&&(t.__H.__h.length&&(zn.push(t)!==1&&In===X.requestAnimationFrame||((In=X.requestAnimationFrame)||tr)($n)),t.__H.__.forEach(function(e){e.u&&(e.__H=e.u),e.u=void 0})),Fn=Y=null},X.__c=function(e,t){t.some(function(e){try{e.__h.forEach(nr),e.__h=e.__h.filter(function(e){return!e.__||rr(e)})}catch(n){t.some(function(e){e.__h&&=[]}),t=[],X.__e(n,e.__v)}}),Un&&Un(e,t)},X.unmount=function(e){Wn&&Wn(e);var t,n=e.__c;n&&n.__H&&(n.__H.__.forEach(function(e){try{nr(e)}catch(e){t=e}}),n.__H=void 0,t&&X.__e(t,n.__v))};var er=typeof requestAnimationFrame==`function`;function tr(e){var t,n=function(){clearTimeout(r),er&&cancelAnimationFrame(t),setTimeout(e)},r=setTimeout(n,35);er&&(t=requestAnimationFrame(n))}function nr(e){var t=Y,n=e.__c;typeof n==`function`&&(e.__c=void 0,n()),Y=t}function rr(e){var t=Y;e.__c=e.__(),Y=t}function ir(e,t){return!e||e.length!==t.length||t.some(function(t,n){return!Ln(t,e[n])})}function ar(e,t){return typeof t==`function`?t(e):t}function or(e,t=null,n=null){"use no memo";let r=e.flattenedSegments;return r==null||r.length===0?t??e.name:J(`span`,{"data-item-flattened-subitems":!0,children:r.map((e,i)=>{let a=i===r.length-1;return J(q,{children:[J(`span`,{"data-item-flattened-subitem":e.path,"data-item-flattened-subitem-drag-target":n===e.path?`true`:void 0,children:a&&t!=null?t:J($t,{children:e.name})}),i<r.length-1?` / `:``]},e.path)})})}function sr(e){return e.isFlattened?e.flattenedSegments?.findLast(e=>e.isTerminal)?.path??e.path:e.path}function cr(e){let t=e.flattenedSegments;return t==null||t.length===0?e.name:t.map(e=>e.name).join(` / `)}function lr(e,t,n,r){return e.map((e,i)=>{let a=i*n,o=e.subtreeEndIndex+1;if(o>=r)return{row:e.row,top:a};let s=o*n-t;return{row:e.row,top:Math.min(a,s-n)}}).filter(e=>e.top+n>0)}function ur({controller:e,itemHeight:t,overscan:n,scrollTop:r,stickyFolders:i,viewportHeight:a}){let o=e.getVisibleCount(),s=i&&o>0?e.getStickyRowCandidates(r,t):[],c=s==null&&i&&o>0?e.getVisibleRows(0,o-1):[],l=mn(c,{itemHeight:t,overscan:n,scrollTop:r,stickyRows:s==null?void 0:lr(s,r,t,o),totalRowCount:o,viewportHeight:a}),u=i&&r<=0&&o>0?e.getStickyRowCandidates(1,t):[],d=u!=null&&r<=0?lr(u,1,t,o):i&&r<=0&&c.length>0?pn(c,1,t):l.sticky.rows;return{overlayHeight:d.reduce((e,n)=>Math.max(e,n.top+t),0),overlayRows:d,snapshot:l,visibleRows:c}}var dr=400,fr=10,pr=40,mr=18;function hr(e,t,n){let r=e,i=document.elementFromPoint?.bind(document)??null,a=r.elementFromPoint?.(t,n)??i?.(t,n)??null;return e instanceof ShadowRoot&&(a==null||!e.contains(a))?gr(e,t,n):a instanceof HTMLElement?a:null}function gr(e,t,n){let r=Array.from(e.querySelectorAll(`[data-type="item"], [data-item-flattened-subitem]`));for(let e=r.length-1;e>=0;e--){let i=r[e],a=i.getBoundingClientRect();if(t>=a.left&&t<=a.right&&n>=a.top&&n<=a.bottom)return i}return null}function _r(e){let t=e?.closest?.(`[data-type="item"]`);if(!(t instanceof HTMLElement))return null;let n=t.dataset.itemPath??null;if(n==null)return null;let r=e?.closest?.(`[data-item-flattened-subitem]`),i=r instanceof HTMLElement?r.getAttribute(`data-item-flattened-subitem`)??null:null;if(i!=null&&i.endsWith(`/`))return{directoryPath:i,flattenedSegmentPath:i,hoveredPath:n,kind:`directory`};if(t.dataset.itemType===`folder`)return{directoryPath:n,flattenedSegmentPath:null,hoveredPath:n,kind:`directory`};let a=t.dataset.itemParentPath??null;return a==null||a.length===0?{directoryPath:null,flattenedSegmentPath:null,hoveredPath:n,kind:`root`}:{directoryPath:a,flattenedSegmentPath:null,hoveredPath:n,kind:`directory`}}function vr(e){let t=e.cloneNode(!0);return t.removeAttribute(`id`),t.dataset.fileTreeDragPreview=`true`,t.setAttribute(`aria-hidden`,`true`),t.tabIndex=-1,Object.assign(t.style,{boxShadow:`0 4px 12px rgba(0, 0, 0, 0.15)`,left:`0px`,margin:`0`,pointerEvents:`none`,position:`fixed`,top:`0px`,willChange:`transform`,zIndex:`10000`}),t}function yr(){return navigator.vendor!==`Apple Computer, Inc.`}function br(e,t){let n=e-t.top;if(n<pr){let e=Math.max(0,n);return-Math.ceil((pr-e)/pr*mr)}let r=t.bottom-e;if(r<pr){let e=Math.max(0,r);return Math.ceil((pr-e)/pr*mr)}return 0}function xr(e,t){if(e!=null){let t=hn[e];return t==null?null:{text:t,title:gn[e]}}return t?{icon:{name:`file-tree-icon-dot`,width:6,height:6},title:_n}:null}function Sr(e,t,n){if(t==null||t.size===0)return null;let r=[];for(let i=e.length-1;i>=0;--i){let a=e[i],o=n.get(a);if(o!=null){for(let e of r)n.set(e,o);return o?`ignored`:null}if(t.has(a)){n.set(a,!0);for(let e of r)n.set(e,!0);return`ignored`}r.push(a)}for(let e of r)n.set(e,!1);return null}function Cr(e){return e!=null&&`toggle`in e}function wr(e){return e.code===`Space`||e.key===` `||e.key===`Spacebar`}function Tr(e){return e.key.length===1&&/^[\p{L}\p{N}]$/u.test(e.key)&&!e.ctrlKey&&!e.metaKey&&!e.altKey}function Er(e){return e==null?``:`[data-item-section="spacing-item"][data-ancestor-path="${e.replaceAll(`\\`,`\\\\`).replaceAll(`"`,`\\"`)}"] { opacity: 1; }`}function Dr(e){return e.shiftKey&&e.key===`F10`||e.key===`ContextMenu`}function Or(e,t){return t&&Dr(e)||(e.ctrlKey||e.metaKey)&&wr(e)?!0:e.key===`ArrowDown`||e.key===`ArrowLeft`||e.key===`ArrowRight`||e.key===`ArrowUp`}var kr=new Set([`ArrowDown`,`ArrowLeft`,`ArrowRight`,`ArrowUp`,`End`,`Home`,`PageDown`,`PageUp`]);function Ar(e){for(let t of e.composedPath())if(t instanceof HTMLElement&&(t.dataset.fileTreeContextMenuRoot===`true`||t.dataset.type===`context-menu-anchor`||t.dataset.type===`context-menu-trigger`||t.getAttribute(`slot`)===`context-menu`))return!0;return!1}function jr(e){return{bottom:e.bottom,height:e.height,left:e.left,right:e.right,top:e.top,width:e.width,x:e.x,y:e.y}}function Mr(e,t){return{bottom:t,height:0,left:e,right:e,top:t,width:0,x:e,y:t}}function Nr(e,t){if(e==null)return t.offsetTop;let n=t.getBoundingClientRect(),r=e.getBoundingClientRect();return n.top-r.top}function Pr(e,t,n){if(n==null){e.delete(t);return}e.set(t,n)}function Fr(e,t,n){if(e==null)return null;let r=t.get(e)??null;if(r!=null)return r;let i=n.get(e)??null;return i?.dataset.itemParked===`true`?null:i}function Ir(e){if(e==null)return[];let t=[];for(let n of e.querySelectorAll(`button[data-file-tree-sticky-row="true"]`)){if(!(n instanceof HTMLElement))continue;let e=n.dataset.fileTreeStickyPath;e!=null&&t.push(e)}return t}function Lr(e,t){if(e==null||t==null)return null;for(let n of e.querySelectorAll(`button[data-item-focused="true"][data-item-parked="true"]`))if(n instanceof HTMLElement&&n.dataset.itemPath===t)return n;return null}function Rr(e,t,n,r,i,a,o){let s=Math.max(0,a-i),c=t?.getBoundingClientRect()??null,l=c==null||n==null?null:n.getBoundingClientRect().top-c.top,u=Lr(e,r),d=c==null||u==null?null:u.getBoundingClientRect().top-c.top;return Math.max(0,Math.min(d??Math.max(l??0,s),Math.max(0,o-i)))}function zr(e,t){return{kind:e.kind,name:cr(e),path:t}}function Br(e){return e==null?void 0:`${e}__tree`}function Vr(e,t,n){if(e!=null)return`${e}__focused-item-${encodeURIComponent(t)}${n?`__parked`:``}`}function Hr(e){return e===`file-tree-icon-chevron`||e===`file-tree-icon-dot`||e===`file-tree-icon-file`||e===`file-tree-icon-lock`}function Ur(e,t){if(e==null)return null;if(`text`in e)return J(`span`,{title:e.title,children:e.text});let n=typeof e.icon==`string`?Hr(e.icon)?t(e.icon):{name:e.icon}:Hr(e.icon.name)?(()=>{let n=t(e.icon.name),{name:r,...i}=e.icon;return{...n,...i}})():e.icon;return J(`span`,{title:e.title,children:J(Ut,{...n})})}function Wr(e){e!=null&&xn(e.querySelector([`button:not([disabled])`,`[href]`,`input:not([disabled])`,`select:not([disabled])`,`textarea:not([disabled])`,`[tabindex]:not([tabindex="-1"])`].join(`, `))??e)}function Gr(e,t,{actionLaneEnabled:n=!1,customDecoration:r=null,decorationLaneEnabled:i=!1,dragTargetFlattenedSegmentPath:a=null,gitDecoration:o=null,gitLaneActive:s=!1,renameInput:c=null,showDecorativeActionAffordance:l=!1}={}){let u=sr(e);return J(q,{children:[e.depth>0?J(`div`,{"data-item-section":`spacing`,children:Array.from({length:e.depth}).map((t,n)=>J(`div`,{"data-item-section":`spacing-item`,"data-ancestor-path":e.ancestorPaths[n]},n))}):null,J(`div`,{"data-item-section":`icon`,children:e.kind===`directory`?J(Ut,{...t(`file-tree-icon-chevron`)}):J(Ut,{...t(`file-tree-icon-file`,u)})}),J(`div`,{"data-item-section":`content`,children:e.isFlattened?or(e,c,a):c??J(tn,{minimumLength:5,split:`extension`,children:e.name})}),i?J(`div`,{"data-item-section":`decoration`,children:r==null?null:Ur(r,t)}):null,s?J(`div`,{"data-item-section":`git`,children:Ur(o,t)}):null,n?J(`div`,{"data-item-section":`action`,children:l?J(`span`,{"aria-hidden":`true`,"data-item-action-affordance":`decorative`,children:J(Ut,{...t(`file-tree-icon-ellipsis`)})}):null}):null]})}function Kr(e,t,n,r={}){let{controller:i,renameView:a,visualFocusPath:o,contextHoverPath:s,draggedPathSet:c,dragTarget:l,dragAndDropEnabled:u,shouldSuppressContextMenu:d,handleRowDragStart:f,handleRowDragEnd:p,handleRowTouchStart:m,instanceId:h,itemHeight:g,gitStatusByPath:_,ignoredGitDirectories:v,ignoredInheritanceCache:y,directoriesWithGitChanges:b,gitLaneActive:x,contextMenuEnabled:S,contextMenuTriggerMode:C,contextMenuButtonTriggerEnabled:w,contextMenuButtonVisibility:T,contextMenuRightClickEnabled:E,registerRenameInput:D,registerButton:ee,resolveIcon:O,renderDecorationForRow:k,openContextMenuForRow:A,onRowClick:j,onKeyDown:M}=e,N=sr(t),{isParked:P=!1,mode:F=`flow`,style:te}=r,ne=F===`sticky`,re=_?.get(N)??null??Sr(t.ancestorPaths,v,y),ie=t.kind===`directory`&&(b?.has(N)??!1),I=k(t,N),ae=xr(re,ie),oe=S&&w,se=I!=null||x||oe,ce=oe&&T===`always`,le=a.getPath()===N,ue=le?a.getValue():``,de=ne||!le?null:J(jn,{ref:D,ariaLabel:`Rename ${cr(t)}`,isFlattened:t.isFlattened,value:ue,onBlur:()=>{a.commit()},onInput:e=>{a.setValue(e.currentTarget.value)}}),fe=Gr(t,O,{actionLaneEnabled:oe,customDecoration:I,decorationLaneEnabled:se,dragTargetFlattenedSegmentPath:l?.flattenedSegmentPath??null,gitDecoration:ae,gitLaneActive:x,renameInput:de,showDecorativeActionAffordance:ce}),pe={...Mn({ariaLabel:cr(t),domId:t.isFocused?Vr(h,N,P):void 0,extraStyle:te,features:{actionLaneEnabled:oe,contextMenuButtonVisibility:oe?T:null,contextMenuEnabled:S,contextMenuTriggerMode:S?C:null,gitLaneActive:x},isParked:P,itemHeight:g,mode:F,row:t,state:{containsGitChange:ie,effectiveGitStatus:re,isContextHovered:s===N,isDragTarget:l?.kind===`directory`&&l.directoryPath===N,isDragging:c?.has(N)===!0,isFocusRinged:t.isFocused&&o===N},targetPath:N}),key:n,onContextMenu:S||u?e=>{if(d()){e.preventDefault();return}S&&(e.preventDefault(),E&&(i.focusMountedPathFromInput(N),A(t,N,{anchorRect:Mr(e.clientX,e.clientY),source:`right-click`})))}:void 0,onFocus:ne?void 0:()=>{i.focusMountedPathFromInput(N)},onKeyDown:ne?void 0:M,ref:e=>{ee(N,e)}};return!ne&&le?J(`div`,{...pe,children:fe}):J(`button`,{...pe,type:`button`,draggable:u&&!P,onDragEnd:u&&!P?p:void 0,onDragStart:u&&!P?e=>{f(e,t,N)}:void 0,onMouseDown:e=>{if(ne){e.preventDefault();return}i.isSearchOpen()&&e.preventDefault()},onTouchStart:u&&!P?e=>{m(e,t,N)}:void 0,onClick:e=>{j(e,t,N,F)},children:fe})}function qr(e,t,n){return t.end<t.start?[]:e.controller.getVisibleRows(t.start,t.end).filter(e=>!n.has(sr(e))).map((n,r)=>Kr(e,n,t.start+r))}function Jr({composition:e,controller:t,gitStatusByPath:n,ignoredGitDirectories:r,directoriesWithGitChanges:i,icons:a,instanceId:o,itemHeight:s=oe,overscan:c=10,renamingEnabled:l=!1,renderRowDecoration:u,searchBlurBehavior:d=`close`,searchEnabled:f=!1,searchFakeFocus:p=!1,slotHost:m,stickyFolders:h=!1,initialViewportHeight:g=420}){"use no memo";let _=Z(null),v=Z(null),y=Z(!1),b=Z(null),S=Z(null),C=Z(null),w=Z(null),T=Z(null),E=Z(new Map),D=Z(new Map),ee=Z(()=>{}),O=Z(null),k=Z(0),A=Z(!1),j=Z(null);j.current!==t&&(A.current=!1,j.current=t);let M=Z(!1),N=Z(null),P=Z(null),F=Z(!1),te=Z(null),I=Z(null),ae=Z(null),se=Z(null),ce=Z(null),le=Z(null),ue=Z(null),de=Z(null),fe=Z(!1),pe=Z(null),L=Z(null),me=Z(null),R=Z(null),he=Zn(()=>new Map,[]),[,ge]=qn(0),[_e,ve]=qn(null),[ye,be]=qn(null),[xe,Se]=qn(null),[z,Ce]=qn(null),[we,Te]=qn(0),[B,Ee]=qn(null),De=Z(B);De.current=B;let Oe=Z(null),ke=Z(null),Ae=Z(null),je=Z(null),Me=Z(null),Ne=Z(!1),Pe=()=>{ke.current=null,Ae.current=null,je.current=null},Fe=(e,t)=>{ke.current=e,Ae.current=null,je.current=t==null?null:{path:e,scrollTop:t}},Ie=(e,t)=>{ke.current=null,Ae.current={path:e,viewportOffset:t},je.current=null},Le=Z(d===`retain`&&t.isSearchOpen()),[Re,ze]=qn(p);Yn(()=>{p||ze(!1)},[p]);let Be=Z(!1),Ve=Qn(()=>{Be.current=!0,ze(e=>e&&!1)},[]),[He,Ue]=qn(()=>ur({controller:t,itemHeight:s,overscan:c,scrollTop:0,stickyFolders:h,viewportHeight:g})),[We,Ge]=qn(!1);Yn(()=>{Ge(!0)},[]);let Ke=e?.contextMenu?.enabled===!0||e?.contextMenu?.render!=null||e?.contextMenu?.onOpen!=null||e?.contextMenu?.onClose!=null,Je=e?.contextMenu?.triggerMode??(Ke?`right-click`:`both`),Ye=Je===`both`||Je===`button`,Xe=e?.contextMenu?.buttonVisibility??`when-needed`,Ze=Je===`both`||Je===`right-click`;Xn(()=>{let e=C.current;if(e==null)return;let t=e=>{if(!(e instanceof CustomEvent))return;let t=e.detail?.path??null;Me.current=t,be(t),Ce(t==null?null:`pointer`)},n=e=>{e instanceof CustomEvent&&(Ne.current=e.detail?.disabled===!0)};return e.addEventListener(`file-tree-debug-set-context-menu-trigger`,t),e.addEventListener(`file-tree-debug-set-scroll-suppression`,n),()=>{e.removeEventListener(`file-tree-debug-set-context-menu-trigger`,t),e.removeEventListener(`file-tree-debug-set-scroll-suppression`,n)}},[]);let Qe=Qn((e,t)=>{Pr(E.current,e,t)},[]),$e=Qn((e,t)=>{Pr(D.current,e,t)},[]),et=Qn(e=>{S.current=e},[]),tt=Qn(e=>Fr(e,D.current,E.current),[]),nt=n!=null||r!=null||i!=null,{resolveIcon:rt}=Zn(()=>x(a),[a]),it=t[qe](),V=it.getPath(),at=V!=null,H=t.isSearchOpen(),ot=t.getSearchValue(),U=t.getFocusedPath(),W=t.getFocusedIndex(),st=t.getScrollRequest(),ct=t.isDragAndDropEnabled(),lt=t.getDragSession(),ut=Zn(()=>lt==null?null:new Set(lt.draggedPaths),[lt]),dt=lt?.target??null,ft=lt?.primaryPath??null,pt=Br(o),{overlayHeight:mt,overlayRows:ht,snapshot:G,visibleRows:gt}=He,K=G.physical.viewportHeight,q=Zn(()=>({end:G.window.endIndex,start:G.window.startIndex}),[G.window.endIndex,G.window.startIndex]),_t=ht,vt=G.sticky.rows,yt=G.physical.totalHeight,bt=G.sticky.height,xt=Zn(()=>new Set(vt.map(e=>sr(e.row))),[vt]),St=W>=0&&W>=q.start&&W<=q.end,Ct=Qn((e,t)=>u?.({item:zr(e,t),row:e})??null,[u]),wt=Qn(e=>xn(e==null?null:E.current.get(e)??null)?!0:xn(C.current),[]),Tt=Qn(e=>{wt(t.focusNearestPath(e))},[t,wt]),Et=Z(Tt);Et.current=Tt;let Dt=Z(!0),Ot=Z(()=>{}),kt=Qn((t=!0)=>{let n=De.current;n!=null&&(Dt.current=Dt.current&&t,Ee(null),e?.contextMenu?.onClose?.(),Dt.current&&Tt(n.path))},[e?.contextMenu,Tt]);Ot.current=kt;let At=Qn(e=>{let t=e==null?null:Nr(C.current,e);Se(e=>e===t?e:t)},[]),jt=Qn((e,n,r)=>{let i=t.getItem(n);if(i==null)return;let a=tt(n);if(a?.dataset.fileTreeStickyRow===`true`){let e=w.current;Fe(n,e?.scrollTop??null),M.current=!0,ve(e=>e===n?e:n)}i.focus(),At(a),Dt.current=!0,Ee({anchorRect:r?.anchorRect??null,item:zr(e,n),path:n,source:r?.source??`keyboard`})},[t,tt,At]),Mt=Qn(e=>{if(l){if(t.isSearchOpen()){let e=w.current,t=Cn(e,K);te.current=W<0||e==null?null:Math.max(0,Math.min(W*s-e.scrollTop,Math.max(0,t-s))),F.current=!0}t.startRenaming(e)!==!1&&(Ce(`focus`),ge(e=>e+1))}},[t,W,s,l,K]),Nt=Qn((e,{restoreTreeFocus:n=!0,targetOffset:r=`live-overlay`}={})=>{let i=w.current;if(i==null)return!1;t.focusPath(e);let a=t.getFocusedIndex();if(a<0)return!1;let o=t.getVisibleRows(a,a)[0]??null;if(o==null)return!1;let l=Cn(i,K),u=t.getVisibleCount()*s,d=r===`sticky-parents`?o.ancestorPaths.length*s:ur({controller:t,itemHeight:s,overscan:c,scrollTop:i.scrollTop,stickyFolders:h,viewportHeight:l}).snapshot.sticky.height;return M.current=!0,On(i,a,s,l,u,d),ee.current(),Oe.current=n?e:null,!0},[t,s,c,K,h]),Pt=()=>y.current===!0||R.current!=null||fe.current===!0,Ft=e=>typeof window.requestAnimationFrame==`function`?window.requestAnimationFrame(()=>{e()}):window.setTimeout(e,16),It=e=>{if(e!=null){if(typeof window.cancelAnimationFrame==`function`){window.cancelAnimationFrame(e);return}window.clearTimeout(e)}},Lt=()=>{se.current!=null&&(clearTimeout(se.current),se.current=null),ae.current=null},Rt=()=>{le.current?.remove(),le.current=null},zt=()=>{It(I.current),I.current=null,ce.current=null},Bt=e=>{let t=C.current?.getRootNode();if(t instanceof ShadowRoot){t.append(e);return}document.body.append(e)},Vt=()=>{de.current?.(),de.current=null,R.current!=null&&(clearTimeout(R.current),R.current=null),fe.current=!1,pe.current=null,me.current=null,L.current!=null&&(L.current.setAttribute(`draggable`,`true`),L.current.style.removeProperty(`touch-action`),L.current=null),Rt(),Lt(),zt(),ue.current=null},Ht=(e,n)=>{let r=C.current?.getRootNode(),i=_r(hr(r instanceof ShadowRoot?r:document,e,n));return t.setDragTarget(i),t.getDragSession()?.target??null},Wt=e=>{let n=t.getDragAndDropConfig()?.openOnDropDelay??800;if(e==null||e.kind!==`directory`||e.directoryPath==null||n<=0){Lt();return}let r=t.getItem(e.directoryPath),i=Cr(r)?r:null;if(i==null||i.isExpanded()){Lt();return}let a=`${e.directoryPath}::${e.flattenedSegmentPath??``}`;ae.current!==a&&(Lt(),ae.current=a,se.current=setTimeout(()=>{let n=t.getDragSession()?.target;n?.kind!==`directory`||n.directoryPath!==e.directoryPath||n.flattenedSegmentPath!==e.flattenedSegmentPath||i.expand()},n))},Gt=()=>{I.current=null;let e=ce.current,n=w.current;if(e==null||n==null||t.getDragSession()==null)return;let r=n.getBoundingClientRect(),i=br(e.clientY,r);if(i===0)return;let a=Math.max(0,n.scrollHeight-n.clientHeight),o=Math.max(0,Math.min(a,n.scrollTop+i));o!==n.scrollTop&&(n.scrollTop=o,ee.current()),Wt(Ht(e.clientX,e.clientY)),I.current=Ft(Gt)},Kt=(e,t)=>{ce.current={clientX:e,clientY:t},I.current??=Ft(Gt)},qt=(e,n,r)=>{let i=e.currentTarget;if(i!=null){if(Vt(),Rt(),Lt(),zt(),t.startDrag(r)===!1){e.preventDefault();return}if(ue.current=n,e.dataTransfer!=null&&(e.dataTransfer.effectAllowed=`move`,e.dataTransfer.dropEffect=`move`,e.dataTransfer.setData(`text/plain`,r),yr())){let t=vr(i),n=i.getBoundingClientRect();Object.assign(t.style,{height:`${n.height}px`,opacity:`0.85`,transform:`translate3d(-9999px, 0px, 0)`,width:`${n.width}px`}),Bt(t),le.current=t,e.dataTransfer.setDragImage(t,Math.max(0,e.clientX-n.left),Math.max(0,e.clientY-n.top))}}},Jt=()=>{Rt(),Lt(),zt(),ue.current=null,t.cancelDrag()},Yt=(e,n,r)=>{if(R.current!=null||fe.current)return;let i=e.touches[0],a=e.currentTarget;if(i==null||a==null)return;me.current={clientX:i.clientX,clientY:i.clientY},L.current=a,a.setAttribute(`draggable`,`false`);let o=(e={})=>{let t=e.restoreNativeDraggable??!fe.current;R.current!=null&&(clearTimeout(R.current),R.current=null),document.removeEventListener(`touchmove`,s),document.removeEventListener(`touchend`,c),document.removeEventListener(`touchcancel`,c),de.current===o&&(de.current=null),t&&(a.setAttribute(`draggable`,`true`),L.current===a&&(L.current=null),me.current=null)},s=e=>{let t=e.touches[0],n=me.current;if(t==null||n==null)return;let r=t.clientX-n.clientX,i=t.clientY-n.clientY;r*r+i*i<=fr*fr||o()},c=()=>{o()};document.addEventListener(`touchmove`,s,{passive:!0}),document.addEventListener(`touchend`,c),document.addEventListener(`touchcancel`,c),de.current=o,R.current=setTimeout(()=>{if(o({restoreNativeDraggable:!1}),t.startDrag(r)===!1){a.setAttribute(`draggable`,`true`),L.current===a&&(L.current=null),me.current=null;return}fe.current=!0,L.current=a,a.setAttribute(`draggable`,`false`),a.style.setProperty(`touch-action`,`none`),ue.current=n;let e=a.getBoundingClientRect(),s=vr(a);Object.assign(s.style,{height:`${e.height}px`,opacity:`0.85`,transform:`translate3d(${e.left}px, ${e.top}px, 0)`,width:`${e.width}px`}),Bt(s),le.current=s,pe.current={x:i.clientX-e.left,y:i.clientY-e.top};let c=e=>{let t=e.touches[0];if(t==null)return;e.preventDefault();let n=pe.current;n!=null&&le.current!=null&&(le.current.style.transform=`translate3d(${t.clientX-n.x}px, ${t.clientY-n.y}px, 0)`),Wt(Ht(t.clientX,t.clientY)),Kt(t.clientX,t.clientY)},l=e=>{let n=e.changedTouches[0];n!=null&&Ht(n.clientX,n.clientY),t.completeDrag(),Vt()},u=()=>{t.cancelDrag(),Vt()};de.current=()=>{document.removeEventListener(`touchmove`,c),document.removeEventListener(`touchend`,l),document.removeEventListener(`touchcancel`,u)},document.addEventListener(`touchmove`,c,{passive:!1}),document.addEventListener(`touchend`,l),document.addEventListener(`touchcancel`,u)},dr)},Xt=e=>{if(B!=null){if(e.key===`Escape`){kt(),e.preventDefault(),e.stopPropagation();return}kr.has(e.key)&&(e.preventDefault(),e.stopPropagation());return}if(it.isActive()){if(e.key===`Escape`)it.cancel();else if(e.key===`Enter`)it.commit();else return;Ce(`focus`),ge(e=>e+1),e.preventDefault(),e.stopPropagation();return}if(l&&e.key===`F2`){Mt(U??void 0),e.preventDefault(),e.stopPropagation();return}if(H){if(e.key===`Escape`)F.current=!1,te.current=null,t.closeSearch();else if(e.key===`Enter`){let e=t.getFocusedPath();e!=null&&t.selectOnlyPath(e);let n=w.current,r=Cn(n,K);te.current=W<0||n==null?null:Math.max(0,Math.min(W*s-n.scrollTop,Math.max(0,r-s))),F.current=!0,t.closeSearch()}else if(e.key===`ArrowDown`)t.focusNextSearchMatch();else if(e.key===`ArrowUp`)t.focusPreviousSearchMatch();else return;Ce(`focus`),ge(e=>e+1),e.preventDefault(),e.stopPropagation();return}if(f&&Tr(e)){t.openSearch(e.key),ge(e=>e+1),e.preventDefault(),e.stopPropagation();return}let n=Ke&&Dr(e),r=Or(e,Ke),i=r&&C.current!=null?Sn(C.current):null,a=r?new Set(Ir(C.current)):new Set,o=i?.dataset.fileTreeStickyPath??null,c=i?.dataset.fileTreeStickyRow===`true`&&o!=null;if(c&&o!==U&&a.has(o)){let e=w.current;Fe(o,e?.scrollTop??null),t.focusPath(o)}let u=t.getFocusedPath(),d=t.getFocusedIndex(),p=t.getFocusedItem();if(p==null)return;let m=Cr(p)?p:null,h=u!=null&&(xt.has(u)||c&&o===u&&a.has(u)),g=e.key===`ArrowDown`||e.key===`ArrowUp`||e.key===`ArrowRight`&&m!=null&&m.isExpanded(),_=e.key===`ArrowLeft`&&h&&m!=null&&m.isExpanded(),v=w.current,y=!0;if(e.shiftKey&&e.key===`ArrowDown`)t.extendSelectionFromFocused(1);else if(e.shiftKey&&e.key===`ArrowUp`)t.extendSelectionFromFocused(-1);else if(n&&u!=null&&d>=0){let e=t.getVisibleRows(d,d)[0]??null,n=Fr(u,D.current,E.current);e==null||n==null?y=!1:jt(e,u)}else if((e.ctrlKey||e.metaKey)&&wr(e))t.toggleFocusedSelection();else if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()===`a`)t.selectAllVisiblePaths();else switch(e.key){case`ArrowDown`:t.focusNextItem();break;case`ArrowUp`:t.focusPreviousItem();break;case`ArrowRight`:m==null||m.isExpanded()?t.focusNextItem():m.expand();break;case`ArrowLeft`:m!=null&&m.isExpanded()?m.collapse():t.focusParentItem();break;case`Home`:t.focusFirstItem();break;case`End`:t.focusLastItem();break;default:y=!1}if(!y)return;Ce(`focus`);let b=t.getFocusedPath(),x=b!=null&&(xt.has(b)||a.has(b)),S=g&&b!==u,T=n&&c&&o===u&&b===u;if((h||T)&&b!=null&&(S&&x||T))Fe(b,v?.scrollTop??null),M.current=!0,ve(e=>e===b?e:b);else{let t=e.key===`ArrowUp`&&h&&b!==u;b!=null&&(t||_&&b===u)?(Ie(b,Rr(C.current,v,i,u,s,bt,K)),M.current=!0,ve(e=>e===b?e:b)):Pe()}ge(e=>e+1),e.preventDefault(),e.stopPropagation()};Xn(()=>{if(!(!f||!H)){if(Le.current){Le.current=!1;return}xn(T.current)}},[H,f]),Xn(()=>{let e=S.current;switch(An({hasRenderedInput:e!=null,previousRenamingPath:P.current,renamingPath:V})){case`reset`:P.current=null;return;case`reveal-canonical`:V!=null&&Nt(V,{restoreTreeFocus:!1,targetOffset:`live-overlay`});return;case`ignore`:return;case`focus-input`:e!=null&&(Oe.current=null,P.current=V,xn(e),e.select());return}},[q.end,q.start,V,Nt,xt]),Xn(()=>{let e=C.current;if(e==null)return;let t=null,n=()=>{t!=null&&(clearTimeout(t),t=null)},r=()=>{let t=Sn(e)?.dataset.itemPath??null;ve(e=>e===t?e:t)},i=()=>{n(),M.current=!0,r()},a=i=>{let a=i.relatedTarget;if(a==null){n(),t=setTimeout(()=>{if(t=null,Sn(e)!=null){r();return}M.current=!1,ve(null)},0);return}if(!(a instanceof Node)||!e.contains(a)){n(),M.current=!1,ve(null);return}let o=a instanceof HTMLElement?a.dataset.itemPath??null:null;ve(e=>e===o?e:o)};return e.addEventListener(`focusin`,i),e.addEventListener(`focusout`,a),()=>{n(),e.removeEventListener(`focusin`,i),e.removeEventListener(`focusout`,a)}},[]),Xn(()=>{let e=C.current;e!=null&&(G.physical.scrollTop<=0?e.dataset.scrollAtTop=`true`:delete e.dataset.scrollAtTop)},[G.physical.scrollTop]),Xn(()=>{let e=null,n=w.current,r=b.current,i=C.current;if(n==null)return;O.current=Cn(n,g);let a=()=>{let e=t.getVisibleCount(),r=wn(O.current,g),i=Math.max(0,e*s-r);n.scrollTop>i&&(n.scrollTop=i),Ue(ur({controller:t,itemHeight:s,overscan:c,scrollTop:Math.min(n.scrollTop,i),stickyFolders:h,viewportHeight:r}))};if(!A.current){A.current=!0;let e=t.getFocusedIndex();if(e>=0){let r=wn(O.current,g),i=t.getVisibleRows(e,e)[0]??null;En(n,e,s,r,h&&i!=null?Math.max(0,Math.min(i.ancestorPaths.length*s,Math.max(0,r-s))):0)}}ee.current=a;let o=!1,l=t.subscribe(()=>{o?ge(e=>e+1):o=!0,a()}),u=()=>{Ne.current!==!0&&(r!=null&&(r.dataset.isScrolling??=``),i!=null&&(i.dataset.isScrolling??=``),y.current=!0,e!=null&&clearTimeout(e),e=setTimeout(()=>{r!=null&&delete r.dataset.isScrolling,i!=null&&delete i.dataset.isScrolling,y.current=!1,Te(e=>e+1),e=null},50))},d=null,f=()=>{i!=null&&delete i.dataset.overlayReveal,d!=null&&(clearTimeout(d),d=null)},p=()=>{i==null||Ne.current===!0||n.scrollTop>0||(i.dataset.overlayReveal=`true`,d!=null&&clearTimeout(d),d=setTimeout(()=>{f()},200))},m=()=>{if(a(),n.scrollTop>0&&f(),De.current!=null&&y.current&&Ot.current(),Ne.current===!0){y.current=!1;return}be(e=>e==null?e:null),u()},_=()=>{u(),p()},v=new Set([`ArrowUp`,`ArrowDown`,`ArrowLeft`,`ArrowRight`,`PageUp`,`PageDown`,`Home`,`End`,` `,`Spacebar`]),x=e=>{v.has(e.key)&&_()};n.addEventListener(`scroll`,m,{passive:!0}),n.addEventListener(`wheel`,_,{passive:!0}),n.addEventListener(`touchmove`,_,{passive:!0}),n.addEventListener(`keydown`,x);let S=typeof ResizeObserver<`u`?new ResizeObserver(e=>{O.current=(e[0]==null?null:Tn(e[0]))??Cn(n,g),a()}):null;return S?.observe(n),()=>{ee.current=()=>{},l(),n.removeEventListener(`scroll`,m),n.removeEventListener(`wheel`,_),n.removeEventListener(`touchmove`,_),n.removeEventListener(`keydown`,x),e!=null&&clearTimeout(e),d!=null&&clearTimeout(d),r!=null&&delete r.dataset.isScrolling,i!=null&&(delete i.dataset.isScrolling,delete i.dataset.overlayReveal),y.current=!1,O.current=null,S?.disconnect()}},[t,g,s,c,h]),Xn(()=>{Ke||B==null||kt(!1)},[kt,Ke,B]);let Zt=Zn(()=>B==null?null:`${B.path}::${B.source}`,[B]);Xn(()=>{if(Zt==null){m?.clearSlotContent(re);return}let t=De.current;if(t==null)return;let n=v.current??_.current;if(n==null)return;let r={anchorElement:n,anchorRect:t.anchorRect??jr(n.getBoundingClientRect()),close:e=>{Ot.current(e?.restoreFocus??!0)},restoreFocus:()=>{Dt.current&&Et.current(De.current?.path??null)}},i=e?.contextMenu?.render?.(t.item,r)??null;return m?.setSlotContent(re,i),e?.contextMenu?.onOpen?.(t.item,r),Wr(i),queueMicrotask(()=>{i==null||!i.isConnected||document.activeElement===i&&Wr(i)}),()=>{m?.clearSlotContent(re)}},[Zt,e?.contextMenu,m]),Xn(()=>{B!=null&&t.getItem(B.path)==null&&kt()},[kt,B,t]),Xn(()=>{if(B==null)return;let e=C.current?.getRootNode(),t=e instanceof ShadowRoot?e.host:C.current,n=e=>{let n=e.target;n instanceof Node&&(Ar(e)||_.current?.contains(n)!==!0&&t?.contains(n)!==!0&&kt())},r=e=>{e.key===`Escape`&&(e.preventDefault(),e.stopPropagation(),kt())};return document.addEventListener(`mousedown`,n,!0),document.addEventListener(`keydown`,r,!0),()=>{document.removeEventListener(`mousedown`,n,!0),document.removeEventListener(`keydown`,r,!0)}},[kt,B]),Xn(()=>{let e=w.current,n=C.current;if(e==null||n==null){N.current=U;return}let r=U==null?null:E.current.get(U)??null,i=Sn(n),a=i?.dataset.itemPath??null,o=at&&S.current===i,c=f&&T.current===i,l=F.current&&!H,u=te.current??0,d=Oe.current,p=ke.current,m=Ae.current,g=je.current,_=i!=null,v=M.current||_,y=N.current!==U,b=p!=null&&p===U&&U!=null,x=!1,D=!1;if(st!=null&&st.id!==k.current){k.current=st.id;let n=st.visibleIndex,r=t.getVisibleRows(n,n)[0]??null;if(r!=null){let t=h?Math.max(0,Math.min(r.ancestorPaths.length*s,Math.max(0,K-s))):bt;x=!0,D=Dn(e,n,s,K,yt,st.offset,t)}t.clearScrollRequest(st.id)}let O=!x&&l&&On(e,W,s,K,yt,u),A=!x&&d!=null&&d===U&&On(e,W,s,K,yt,bt),j=!x&&m!=null&&m.path===U&&On(e,W,s,K,yt,m.viewportOffset),P=!x&&g!=null&&g.path===U&&e.scrollTop!==g.scrollTop;if(P&&(e.scrollTop=g.scrollTop),(P||D||A||j||O||v&&y&&d!==U&&!b&&En(e,W,s,K,bt))&&ee.current(),x){N.current=U;return}if(!v){N.current=U;return}if(o){N.current=U;return}if(c&&!l){N.current=U;return}if(r==null){l&&W>=0&&(On(e,W,s,K,yt,u),ee.current()),N.current=U;return}(y||l||d===U||p===U||m?.path===U||g?.path===U||a==null||a!==U)&&(xn(r),d===U&&(Oe.current=null),p===U&&(ke.current=null),m?.path===U&&(Ae.current=null),g?.path===U&&(je.current=null),F.current=!1,te.current=null),N.current=U},[t,W,U,St,s,at,H,q,K,f,st,h,bt,yt,gt]);let Qt=W>=0&&W>=G.visible.startIndex&&W<=G.visible.endIndex,$t=U!=null&&_t.some(e=>sr(e.row)===U),en=Qt||$t,tn=Ye&&M.current===!0&&en?U:null,nn=z===`pointer`?ye:null,rn=B?.path??Me.current??nn??tn??ye,an=B?.source===`right-click`;Xn(()=>{y.current&&B==null||At(tt(rn))},[B,tt,q,K,we,_t,rn,At,gt]);let on=Qn(e=>{if(y.current||Ar(e))return;let t=e.target;if(!(t instanceof HTMLElement)||t.closest?.(`[data-type="context-menu-trigger"]`)!=null)return;let n=t.closest?.(`[data-file-tree-sticky-row="true"]`),r=t.closest?.(`[data-type="item"]`),i=n instanceof HTMLElement?n.dataset.fileTreeStickyPath??null:r instanceof HTMLElement?r.dataset.itemPath??null:null;i!=null&&Ce(e=>e===`pointer`?e:`pointer`),be(e=>e===i?e:i)},[]),sn=Qn(()=>{be(null)},[]);Xn(()=>{if(!ct)return;let e=()=>{Vt(),t.cancelDrag()};return window.addEventListener(`dragend`,e),()=>{window.removeEventListener(`dragend`,e),Vt(),t.cancelDrag()}},[t,ct]);let cn=e=>{if(!ct||t.getDragSession()==null||fe.current)return;let n=_r(e.target instanceof HTMLElement?e.target:null);t.setDragTarget(n),Wt(t.getDragSession()?.target??null),Kt(e.clientX,e.clientY),e.dataTransfer!=null&&(e.dataTransfer.dropEffect=`move`),e.preventDefault()},ln=e=>{if(!ct||t.getDragSession()==null||fe.current)return;let n=e.relatedTarget;n instanceof Node&&C.current?.contains(n)===!0||(Lt(),zt(),t.setDragTarget(null))},un=e=>{!ct||t.getDragSession()==null||fe.current||(e.preventDefault(),Ht(e.clientX,e.clientY),t.completeDrag(),Rt(),Lt(),zt(),ue.current=null)},dn=G.window.height,fn=G.window.offsetTop,pn=Math.min(0,K-dn),mn=Math.min(0,K-dn-bt),hn=_e===U||F.current,gn=U!=null&&hn&&!St&&W>=0?gt[W]??t.getVisibleRows(W,W)[0]??null:null,_n=gn==null?null:kn(W,s,q,dn),vn=ue.current,yn=ft!=null&&vn!=null&&vn.path===ft&&vn.index>=q.start&&vn.index<=q.end,bn=ft!=null&&vn!=null&&vn.path===ft&&!yn&&vn.path!==gn?.path?vn:null,jn=bn==null?null:kn(bn.index,s,q,dn),Mn=Er((W>=0?gt[W]??t.getVisibleRows(W,W)[0]??null:null)?.ancestorPaths.at(-1)??null),Pn=H&&U!=null?Vr(o,U,!St):void 0,Y=B?.path??(H?U:_e),Fn=B?.path??ye,In=tt(rn),Ln=Ke&&Ye&&!an&&!at&&In!=null&&xe!=null&&rn!=null,Rn=Ke&&(Ln||B!=null),zn=B?.anchorRect,X=zn==null&&In!=null&&xe!=null&&(B!=null||Ln)?xe:null,Bn=zn==null?X==null?void 0:{top:`${X}px`}:{left:`${zn.left}px`,position:`fixed`,right:`auto`,top:`${zn.top}px`},Vn=an?{opacity:`0`}:void 0,Hn=Qn((e,n,r,i)=>{let a=Nn({event:{ctrlKey:e.ctrlKey,metaKey:e.metaKey,shiftKey:e.shiftKey},isDirectory:n.kind===`directory`,isSearchOpen:H,mode:i}),o=a.toggleDirectory&&n.kind===`directory`,s=o?t.resolveMountedDirectoryPathFromInput(r):null;if(o&&s==null)return;let c=s??r;switch(a.selection.kind){case`range`:t.selectPathRange(c,a.selection.additive);break;case`toggle`:t.togglePathSelectionFromInput(c);break;case`single`:t.selectOnlyMountedPathFromInput(c);break}let l=e.currentTarget instanceof HTMLElement?e.currentTarget:null,u=n.index>=G.visible.startIndex&&n.index<=G.visible.endIndex,d=i===`flow`&&u&&l!=null&&l.dataset.itemParked!==`true`;t.focusMountedPathFromInput(c),d&&(M.current=!0,ve(e=>e===c?e:c),Ce(`focus`)),o&&t.toggleMountedDirectoryFromInput(c),a.closeSearch&&t.closeSearch(),a.revealCanonical&&Nt(c,{targetOffset:`sticky-parents`})},[t,H,G.visible.endIndex,G.visible.startIndex,Nt]),Un=()=>{if(y.current||!Ye||rn==null||In==null)return;let e=t.getItem(rn);e!=null&&(At(In),Dt.current=!0,Ee({anchorRect:null,item:{kind:e.isDirectory()?`directory`:`file`,name:In.getAttribute(`aria-label`)??rn,path:e.getPath()},path:e.getPath(),source:`button`}))},Wn={contextHoverPath:Fn,contextMenuButtonTriggerEnabled:Ye,contextMenuButtonVisibility:Xe,contextMenuEnabled:Ke,contextMenuRightClickEnabled:Ze,contextMenuTriggerMode:Je,controller:t,directoriesWithGitChanges:i,dragAndDropEnabled:ct,draggedPathSet:ut,dragTarget:dt,gitLaneActive:nt,gitStatusByPath:n,handleRowDragEnd:Jt,handleRowDragStart:qt,handleRowTouchStart:Yt,ignoredGitDirectories:r,ignoredInheritanceCache:he,instanceId:o,itemHeight:s,onKeyDown:Xt,onRowClick:Hn,openContextMenuForRow:jt,registerButton:Qe,registerRenameInput:et,renameView:it,renderDecorationForRow:Ct,resolveIcon:rt,shouldSuppressContextMenu:Pt,visualFocusPath:Y},Gn={...Wn,registerButton:$e};return J(`div`,{ref:C,id:pt,"data-file-tree-context-menu-button-visibility":Ke&&Ye?Xe:void 0,"data-file-tree-context-menu-trigger-mode":Ke?Je:void 0,"data-file-tree-has-context-menu-action-lane":Ke&&Ye?`true`:void 0,"data-file-tree-has-git-lane":nt?`true`:void 0,"data-file-tree-virtualized-root":`true`,onDragLeave:ct?ln:void 0,onDragOver:ct?cn:void 0,onDrop:ct?un:void 0,onKeyDown:Xt,onPointerLeave:Ke?sn:void 0,onPointerOver:Ke?on:void 0,role:`tree`,tabIndex:-1,style:{outline:`none`,position:`relative`},children:[J(`style`,{"data-file-tree-guide-style":`true`,dangerouslySetInnerHTML:{__html:Mn}}),J(`slot`,{name:ne,"data-type":`header-slot`}),f?J(`div`,{"data-file-tree-search-container":!0,"data-open":H?`true`:`false`,children:J(`input`,{ref:T,"aria-activedescendant":Pn,"aria-controls":pt,placeholder:`Search…`,"data-file-tree-search-input":!0,"data-file-tree-search-input-fake-focus":Re?`true`:void 0,value:ot,onBlur:()=>{d===`retain`&&!Be.current||t.closeSearch()},onFocus:Ve,onPointerDown:Ve,onInput:e=>{Ve();let n=e.currentTarget;t.setSearch(n.value)}})}):null,J(`div`,{ref:w,"data-file-tree-virtualized-scroll":`true`,children:[h&&We&&_t.length>0?J(`div`,{"aria-hidden":`true`,"data-file-tree-sticky-overlay":`true`,children:J(`div`,{"data-file-tree-sticky-overlay-content":`true`,style:{height:`${mt}px`},children:_t.map((e,t)=>Kr(Gn,e.row,`sticky:${sr(e.row)}`,{mode:`sticky`,style:{left:`0`,position:`absolute`,right:`0`,top:`${e.top}px`,zIndex:`${_t.length-t}`}}))})}):null,J(`div`,{ref:b,"data-file-tree-virtualized-list":`true`,style:{height:`${yt}px`},children:[J(`div`,{"data-file-tree-virtualized-sticky-offset":`true`,"aria-hidden":`true`,style:{height:`${fn}px`}}),J(`div`,{"data-file-tree-virtualized-sticky":`true`,style:{height:`${dn}px`,top:`${pn}px`,bottom:`${mn}px`},children:[qr(Wn,q,xt),gn!=null&&_n!=null?Kr(Wn,gn,`parked:${gn.path}`,{isParked:!0,style:{left:`0`,opacity:`0`,pointerEvents:ft===gn.path?`none`:void 0,position:`absolute`,right:`0`,top:`${_n}px`}}):null,bn!=null&&jn!=null?Kr(Wn,bn,`parked-drag:${bn.path}`,{isParked:!0,style:{left:`0`,opacity:`0`,pointerEvents:`none`,position:`absolute`,right:`0`,top:`${jn}px`}}):null]})]})]}),Ke?J(`div`,{ref:_,"data-type":`context-menu-anchor`,"data-visible":Rn?`true`:`false`,style:Bn,children:[J(`button`,{ref:v,type:`button`,"data-type":ie,"aria-label":`Options`,"aria-haspopup":`menu`,"aria-expanded":B==null?`false`:`true`,"data-visible":Ln?`true`:`false`,onMouseDown:e=>{e.preventDefault()},onClick:e=>{if(e.preventDefault(),e.stopPropagation(),B!=null){kt();return}Un()},tabIndex:-1,style:Vn,children:J(Ut,{...rt(`file-tree-icon-ellipsis`)})}),B==null?null:J(`slot`,{name:re})]}):null,B==null?null:J(`div`,{"data-type":`context-menu-wash`,"aria-hidden":`true`,onMouseDownCapture:e=>{e.preventDefault(),kt()},onTouchStartCapture:e=>{e.preventDefault(),e.stopPropagation(),kt()},onTouchMoveCapture:e=>{e.preventDefault(),e.stopPropagation()},onWheelCapture:e=>{e.preventDefault(),e.stopPropagation()}})]})}var Yr={hydrateRoot:(e,t)=>{Rt(gt(Jr,t),e)},renderRoot:(e,t)=>{Lt(gt(Jr,t),e)},unmountRoot:e=>{Lt(null,e)}};function Xr(e,t){Yr.renderRoot(e,t)}function Zr(e,t){Yr.hydrateRoot(e,t)}function Qr(e){Yr.unmountRoot(e)}var $r=class{#e=new Map;#t=null;clearAll(){for(let e of this.#e.values())e.remove();this.#e.clear()}clearSlotContent(e){let t=this.#n(e);t!=null&&(t.remove(),this.#e.delete(e))}setHost(e){if(this.#t=e,e!=null){this.#i(e);for(let[e,t]of this.#e)this.#r(e,t)}}setSlotContent(e,t){let n=this.#n(e);if(n===t){t!=null&&(this.#e.set(e,t),this.#r(e,t));return}if(n?.remove(),t==null){this.#e.delete(e);return}this.#e.set(e,t),this.#r(e,t)}setSlotHtml(e,t){let n=t?.trim()??``;if(n.length===0){this.setSlotContent(e,null);return}let r=this.#n(e);if(r!=null&&r.innerHTML===n){this.#e.set(e,r),this.#r(e,r);return}let i=document.createElement(`div`);i.innerHTML=n,this.setSlotContent(e,i)}#n(e){let t=this.#e.get(e)??null;if(t!=null)return t;let n=this.#t;if(n==null)return null;for(let t of Array.from(n.children))if(t instanceof HTMLElement&&t.dataset.fileTreeManagedSlot===e)return t;return null}#r(e,t){t.slot=e,t.dataset.fileTreeManagedSlot=e,this.#t!=null&&t.parentNode!==this.#t&&this.#t.appendChild(t)}#i(e){for(let t of Array.from(e.children)){if(!(t instanceof HTMLElement))continue;let e=t.dataset.fileTreeManagedSlot;e==null||this.#e.has(e)||this.#e.set(e,t)}}},ei=`__c`,ti=`__k`,ni=`__d`,ri=`__s`,ii=/[\s\n\\/='"\0<>]/,ai=/^(xlink|xmlns|xml)([A-Z])/,oi=/^(?:accessK|auto[A-Z]|cell|ch|col|cont|cross|dateT|encT|form[A-Z]|frame|hrefL|inputM|maxL|minL|noV|playsI|popoverT|readO|rowS|src[A-Z]|tabI|useM|item[A-Z])/,si=/^ac|^ali|arabic|basel|cap|clipPath$|clipRule$|color|dominant|enable|fill|flood|font|glyph[^R]|horiz|image|letter|lighting|marker[^WUH]|overline|panose|pointe|paint|rendering|shape|stop|strikethrough|stroke|text[^L]|transform|underline|unicode|units|^v[^i]|^w|^xH/,ci=new Set([`draggable`,`spellcheck`]);function li(e){e.__g===void 0?e[ni]=!0:e.__g|=8}function ui(e){e.__g===void 0?e[ni]=!1:e.__g&=-9}function di(e){return e.__g===void 0?!0===e[ni]:!!(8&e.__g)}var fi=/["&<]/;function pi(e){if(e.length===0||!1===fi.test(e))return e;for(var t=0,n=0,r=``,i=``;n<e.length;n++){switch(e.charCodeAt(n)){case 34:i=`&quot;`;break;case 38:i=`&amp;`;break;case 60:i=`&lt;`;break;default:continue}n!==t&&(r+=e.slice(t,n)),r+=i,t=n+1}return n!==t&&(r+=e.slice(t,n)),r}var mi={},hi=new Set(`animation-iteration-count.border-image-outset.border-image-slice.border-image-width.box-flex.box-flex-group.box-ordinal-group.column-count.fill-opacity.flex.flex-grow.flex-negative.flex-order.flex-positive.flex-shrink.flood-opacity.font-weight.grid-column.grid-row.line-clamp.line-height.opacity.order.orphans.stop-opacity.stroke-dasharray.stroke-dashoffset.stroke-miterlimit.stroke-opacity.stroke-width.tab-size.widows.z-index.zoom`.split(`.`)),gi=/[A-Z]/g;function _i(e){var t=``;for(var n in e){var r=e[n];if(r!=null&&r!==``){var i=n[0]==`-`?n:mi[n]||(mi[n]=n.replace(gi,`-$&`).toLowerCase()),a=`;`;typeof r!=`number`||i.startsWith(`--`)||hi.has(i)||(a=`px;`),t=t+i+`:`+r+a}}return t||void 0}function vi(){this.__d=!0}function yi(e,t){return{__v:e,context:t,props:e.props,setState:vi,forceUpdate:vi,__d:!0,__h:[]}}function bi(e,t,n){if(!e.s){if(n instanceof xi){if(!n.s)return void(n.o=bi.bind(null,e,t));1&t&&(t=n.s),n=n.v}if(n&&n.then)return void n.then(bi.bind(null,e,t),bi.bind(null,e,2));e.s=t,e.v=n;let r=e.o;r&&r(e)}}var xi=function(){function e(){}return e.prototype.then=function(t,n){var r=new e,i=this.s;if(i){var a=1&i?t:n;if(a){try{bi(r,1,a(this.v))}catch(e){bi(r,2,e)}return r}return this}return this.o=function(e){try{var i=e.v;1&e.s?bi(r,1,t?t(i):i):n?bi(r,1,n(i)):bi(r,2,i)}catch(e){bi(r,2,e)}},r},e}(),Si,Ci,wi,Ti,Ei={},Di=Array.isArray,Oi=Object.assign,ki=``,Ai=`<!--$s-->`,ji=`<!--/$s-->`;function Mi(e,t){var n,r=e.type,i=!0;return e[ei]?(i=!1,(n=e[ei]).state=n[ri]):n=new r(e.props,t),e[ei]=n,n.__v=e,n.props=e.props,n.context=t,li(n),n.state??=Ei,n[ri]??(n[ri]=n.state),r.getDerivedStateFromProps?n.state=Oi({},n.state,r.getDerivedStateFromProps(n.props,n.state)):i&&n.componentWillMount?(n.componentWillMount(),n.state=n[ri]===n.state?n.state:n[ri]):!i&&n.componentWillUpdate&&n.componentWillUpdate(),wi&&wi(e),n.render(n.props,n.state,t)}function Ni(e,t,n,r,i,a,o){if(e==null||!0===e||!1===e||e===ki)return ki;var s=typeof e;if(s!=`object`)return s==`function`?ki:s==`string`?pi(e):e+ki;if(Di(e)){var c,l=ki;i[ti]=e;for(var u=e.length,d=0;d<u;d++){var f=e[d];if(f!=null&&typeof f!=`boolean`){var p,m=Ni(f,t,n,r,i,a,o);typeof m==`string`?l+=m:(c||=Array(u),l&&c.push(l),l=ki,Di(m)?(p=c).push.apply(p,m):c.push(m))}}return c?(l&&c.push(l),c):l}if(e.constructor!==void 0)return ki;e.__=i,Si&&Si(e);var h=e.type,g=e.props;if(typeof h==`function`){var _,v,y,b=t;if(h===q){if(`tpl`in g){for(var x=ki,S=0;S<g.tpl.length;S++)if(x+=g.tpl[S],g.exprs&&S<g.exprs.length){var C=g.exprs[S];if(C==null)continue;typeof C!=`object`||C.constructor!==void 0&&!Di(C)?x+=C:x+=Ni(C,t,n,r,e,a,o)}return x}if(`UNSTABLE_comment`in g)return`<!--`+pi(g.UNSTABLE_comment)+`-->`;v=g.children}else{if((_=h.contextType)!=null){var w=t[_.__c];b=w?w.props.value:_.__}var T=h.prototype&&typeof h.prototype.render==`function`;if(T)v=Mi(e,b),y=e[ei];else{e[ei]=y=yi(e,b);for(var E=0;di(y)&&E++<25;){ui(y),wi&&wi(e);try{v=h.call(y,g,b)}catch(t){throw a&&t&&typeof t.then==`function`&&(e._suspended=!0),t}}li(y)}if(y.getChildContext!=null&&(t=Oi({},t,y.getChildContext())),T&&V.errorBoundaries&&(h.getDerivedStateFromError||y.componentDidCatch)){v=v!=null&&v.type===q&&v.key==null&&v.props.tpl==null?v.props.children:v;try{return Ni(v,t,n,r,e,a,!1)}catch(i){return h.getDerivedStateFromError&&(y[ri]=h.getDerivedStateFromError(i)),y.componentDidCatch&&y.componentDidCatch(i,Ei),di(y)?(v=Mi(e,t),(y=e[ei]).getChildContext!=null&&(t=Oi({},t,y.getChildContext())),Ni(v=v!=null&&v.type===q&&v.key==null&&v.props.tpl==null?v.props.children:v,t,n,r,e,a,o)):ki}finally{Ci&&Ci(e),Ti&&Ti(e)}}}v=v!=null&&v.type===q&&v.key==null&&v.props.tpl==null?v.props.children:v;try{var D=Ni(v,t,n,r,e,a,o);return Ci&&Ci(e),V.unmount&&V.unmount(e),e._suspended?typeof D==`string`?Ai+D+ji:Di(D)?(D.unshift(Ai),D.push(ji),D):D.then(function(e){return Ai+e+ji}):D}catch(i){if(!a&&o&&o.onError){var ee=function i(s){return o.onError(s,e,function(e,s){try{return Ni(e,t,n,r,s,a,o)}catch(e){return i(e)}})}(i);if(ee!==void 0)return ee;var O=V.__e;return O&&O(i,e),ki}if(!a||!i||typeof i.then!=`function`)throw i;return i.then(function i(){try{var s=Ni(v,t,n,r,e,a,o);return e._suspended?Ai+s+ji:s}catch(e){if(!e||typeof e.then!=`function`)throw e;return e.then(i)}})}}var k,A=`<`+h,j=ki;for(var M in g){var N=g[M];if(typeof(N=Fi(N)?N.value:N)!=`function`||M===`class`||M===`className`){switch(M){case`children`:k=N;continue;case`key`:case`ref`:case`__self`:case`__source`:continue;case`htmlFor`:if(`for`in g)continue;M=`for`;break;case`className`:if(`class`in g)continue;M=`class`;break;case`defaultChecked`:M=`checked`;break;case`defaultSelected`:M=`selected`;break;case`defaultValue`:case`value`:switch(M=`value`,h){case`textarea`:k=N;continue;case`select`:r=N;continue;case`option`:r!=N||`selected`in g||(A+=` selected`)}break;case`dangerouslySetInnerHTML`:j=N&&N.__html;continue;case`style`:typeof N==`object`&&(N=_i(N));break;case`acceptCharset`:M=`accept-charset`;break;case`httpEquiv`:M=`http-equiv`;break;default:if(ai.test(M))M=M.replace(ai,`$1:$2`).toLowerCase();else{if(ii.test(M))continue;M[4]!==`-`&&!ci.has(M)||N==null?n?si.test(M)&&(M=M===`panose1`?`panose-1`:M.replace(/([A-Z])/g,`-$1`).toLowerCase()):oi.test(M)&&(M=M.toLowerCase()):N+=ki}}N!=null&&!1!==N&&(A=!0===N||N===ki?A+` `+M:A+` `+M+`="`+(typeof N==`string`?pi(N):N+ki)+`"`)}}if(ii.test(h))throw Error(h+` is not a valid HTML tag name in `+A+`>`);if(j||(typeof k==`string`?j=pi(k):k!=null&&!1!==k&&!0!==k&&(j=Ni(k,t,h===`svg`||h!==`foreignObject`&&n,r,e,a,o))),Ci&&Ci(e),Ti&&Ti(e),!j&&Pi.has(h))return A+`/>`;var P=`</`+h+`>`,F=A+`>`;return Di(j)?[F].concat(j,[P]):typeof j==`string`?F+j+P:[F,j,P]}var Pi=new Set([`area`,`base`,`br`,`col`,`command`,`embed`,`hr`,`img`,`input`,`keygen`,`link`,`meta`,`param`,`source`,`track`,`wbr`]);function Fi(e){return typeof e==`object`&&!!e&&typeof e.peek==`function`&&`value`in e}var Ii=0;function Li(e){return e!=null&&e.length>0?e:(Ii+=1,`pst_ft_${Ii}`)}function Ri({initialVisibleRowCount:e,itemHeight:t}){return e==null?420:Math.max(0,e)*(t??oe)}function zi(e){if(typeof document>`u`)return;let t=document.createElement(`div`);t.innerHTML=e;let n=t.querySelector(`svg`);return n instanceof SVGElement?n:void 0}function Bi(e){return e.querySelector(`#file-tree-icon-chevron`)instanceof SVGElement&&e.querySelector(`#file-tree-icon-file`)instanceof SVGElement&&e.querySelector(`#file-tree-icon-dot`)instanceof SVGElement&&e.querySelector(`#file-tree-icon-lock`)instanceof SVGElement}function Vi(e){return Array.from(e.children).filter(e=>e instanceof SVGElement)}var Hi=class{static LoadedCustomComponent=!0;#e;#t;#n;#r;#i;#a;#o;#s;#c;#l=new $r;#u;#d;#f;#p;#m;#h;#g;#_;#v;#y=null;#b;#x=!1;#S=!1;constructor(e){let{composition:t,density:n,fileTreeSearchMode:r,gitStatus:i,id:a,initialSearchQuery:o,icons:s,itemHeight:c,onSearchChange:l,onSelectionChange:u,overscan:d,renderRowDecoration:f,renaming:p,search:m,searchBlurBehavior:h,searchFakeFocus:g,stickyFolders:_,unsafeCSS:v,initialVisibleRowCount:y,...b}=e;this.#e=t,this.#n=Li(a),this.#p=it(i),this.#m=s,this.#h=v,this.#r=u,this.#i=f,this.#a=p!=null&&p!==!1,this.#o=h,this.#s=m===!0,this.#c=g===!0,this.#u=ae(n,c),this.#d={itemHeight:this.#u.itemHeight,overscan:d,stickyFolders:_,initialVisibleRowCount:y},this.#t=new $e({...b,fileTreeSearchMode:r,initialSearchQuery:o,onSearchChange:l,renaming:p}),this.#v=this.#t.getSelectionVersion(),this.#y=this.#r==null?null:this.subscribe(()=>{this.#D()})}unmount(){this.#b!=null&&(Qr(this.#b),delete this.#b.dataset.fileTreeVirtualizedWrapper,this.#b=void 0),this.#l.clearAll(),this.#l.setHost(null),this.#f!=null&&(delete this.#f.dataset.fileTreeVirtualized,this.#I(this.#f),this.#f=void 0)}cleanUp(){this.unmount(),this.#y?.(),this.#y=null,this.#t.destroy()}getFileTreeContainer(){return this.#f}getItem(e){return this.#t.getItem(e)}getFocusedItem(){return this.#t.getFocusedItem()}getFocusedPath(){return this.#t.getFocusedPath()}getSelectedPaths(){return this.#t.getSelectedPaths()}getComposition(){return this.#e}getItemHeight(){return this.#u.itemHeight}getDensityFactor(){return this.#u.factor}subscribe(e){let t=!1;return this.#t.subscribe(()=>{if(!t){t=!0;return}e()})}focusPath(e){this.#t.focusPath(e)}scrollToPath(e,t){this.#t.scrollToPath(e,t)}focusNearestPath(e){return this.#t.focusNearestPath(e)}add(e){this.#t.add(e)}batch(e){this.#t.batch(e)}move(e,t,n){this.#t.move(e,t,n)}onMutation(e,t){return this.#t.onMutation(e,t)}setSearch(e){this.#t.setSearch(e)}openSearch(e){this.#t.openSearch(e)}closeSearch(){this.#t.closeSearch()}isSearchOpen(){return this.#t.isSearchOpen()}getSearchValue(){return this.#t.getSearchValue()}getSearchMatchingPaths(){return this.#t.getSearchMatchingPaths()}focusNextSearchMatch(){this.#t.focusNextSearchMatch()}focusPreviousSearchMatch(){this.#t.focusPreviousSearchMatch()}startRenaming(e,t){return this.#t.startRenaming(e,t)}remove(e,t){this.#t.remove(e,t)}resetPaths(e,t){this.#t.resetPaths(e,t)}setComposition(e){this.#e=e;let t=this.#T();t!=null&&(this.#O(),Xr(t.wrapper,this.#w()))}setGitStatus(e){this.#p=it(e,this.#p);let t=this.#T();t!=null&&Xr(t.wrapper,this.#w())}setIcons(e){this.#m=e;let t=this.#T();t!=null&&(this.#E(t.host,t.wrapper),Xr(t.wrapper,this.#w()))}hydrate({fileTreeContainer:e}){let t=this.#P(e),n=this.#N(t);this.#O(),Zr(n,this.#w())}render({containerWrapper:e,fileTreeContainer:t}){let n=this.#P(t??this.#f,e),r=this.#N(n);this.#O(),Xr(r,this.#w())}#C(){return{initialViewportHeight:Ri({initialVisibleRowCount:this.#d.initialVisibleRowCount,itemHeight:this.#d.itemHeight}),itemHeight:this.#d.itemHeight,overscan:this.#d.overscan,stickyFolders:this.#d.stickyFolders}}#w(){return{composition:this.#e,controller:this.#t,gitStatusByPath:this.#p?.statusByPath,ignoredGitDirectories:this.#p?.ignoredDirectoryPaths,directoriesWithGitChanges:this.#p?.directoriesWithChanges,icons:this.#m,instanceId:this.#n,renamingEnabled:this.#a,renderRowDecoration:this.#i,searchBlurBehavior:this.#o,searchEnabled:this.#s,searchFakeFocus:this.#c,slotHost:this.#l,...this.#C()}}#T(){let e=this.#f,t=this.#b;return e==null||t==null?null:{host:e,wrapper:t}}#E(e,t){let n=e.shadowRoot;n!=null&&(this.#k(n),this.#A(n)),this.#j(t)}#D(){let e=this.#r;if(e==null)return;let t=this.#t.getSelectionVersion();t!==this.#v&&(this.#v=t,e(this.#t.getSelectedPaths()))}#O(){let e=this.#e?.header?.render;if(e!=null){this.#l.setSlotContent(ne,e());return}this.#l.setSlotHtml(ne,this.#e?.header?.html??null)}#k(e){let t=Vi(e).find(e=>Bi(e)),n=zi(b(y(this.#m).set));n!=null&&(t!=null&&t.outerHTML===n.outerHTML||(t==null?e.prepend(n):t.replaceWith(n)))}#A(e){let t=Vi(e),n=t.find(e=>Bi(e)),r=t.filter(e=>e!==n),i=y(this.#m).spriteSheet?.trim()??``;if(i.length===0){for(let e of r)e.remove();return}let a=zi(i);if(a==null){for(let e of r)e.remove();return}if(!(r.length===1&&r[0].outerHTML===a.outerHTML)){for(let e of r)e.remove();e.appendChild(a)}}#j(e){let t=y(this.#m);t.colored&&v(t.set)?e.dataset.fileTreeColoredIcons=`true`:delete e.dataset.fileTreeColoredIcons}#M(e){let t=e.querySelector(`style[${N}]`);if(this.#g==null&&t instanceof HTMLStyleElement&&(this.#g=t),this.#h==null||this.#h===``){this.#g?.remove(),this.#g=void 0,this.#_=void 0;return}this.#g?.parentNode===e&&this.#_===this.#h||(this.#g??=document.createElement(`style`),this.#g.setAttribute(N,``),this.#g.parentNode!==e&&e.appendChild(this.#g),this.#g.textContent=ue(this.#h),this.#_=this.#h)}#N(e){if(this.#b!=null)return this.#b;let t=e.shadowRoot;if(t==null)throw Error(`FileTree requires a shadow root`);let n=Array.from(t.children).filter(e=>e instanceof HTMLDivElement&&typeof e.dataset.fileTreeId==`string`&&e.dataset.fileTreeId.length>0),r=n.find(e=>e.dataset.fileTreeId===this.#n)??n[0];return r!=null&&(this.#n=r.dataset.fileTreeId??this.#n),this.#b=r??document.createElement(`div`),this.#b.dataset.fileTreeId=this.#n,this.#b.dataset.fileTreeVirtualizedWrapper=`true`,this.#E(e,this.#b),this.#b.parentNode!==t&&t.appendChild(this.#b),this.#b}#P(e,t){let n=e??this.#f??document.createElement(`file-tree-container`);t!=null&&n.parentNode!==t&&t.appendChild(n);let r=n.shadowRoot??n.attachShadow({mode:`open`});return R(n,r),this.#M(r),n.dataset.fileTreeVirtualized=`true`,n.style.display=`flex`,this.#F(n),this.#l.setHost(n),this.#f=n,n}#F(e){e.style.getPropertyValue(`--trees-item-height`)===``&&(e.style.setProperty(`--trees-item-height`,`${String(this.#u.itemHeight)}px`),this.#x=!0),e.style.getPropertyValue(`--trees-density-override`)===``&&(e.style.setProperty(`--trees-density-override`,String(this.#u.factor)),this.#S=!0)}#I(e){this.#x&&=(e.style.removeProperty(`--trees-item-height`),!1),this.#S&&=(e.style.removeProperty(`--trees-density-override`),!1)}},Q=e(t(),1),$=n(),Ui=typeof window>`u`?Q.useEffect:Q.useLayoutEffect;function Wi(e,t,n){let r=e==null?null:(0,$.jsx)(`div`,{slot:ne,children:e}),i=t!=null&&n!=null?(0,$.jsx)(`div`,{slot:re,children:t(n.item,n.context)}):null;return r==null&&i==null?null:(0,$.jsxs)($.Fragment,{children:[r,i]})}function Gi(e,t){return typeof window>`u`&&t!=null?(0,$.jsxs)($.Fragment,{children:[(0,$.jsx)(`template`,{shadowrootmode:`open`,dangerouslySetInnerHTML:{__html:t.shadowHtml}}),e]}):(0,$.jsx)($.Fragment,{children:e})}function Ki(e){let t=e.shadowRoot;return t?.querySelector(`[data-file-tree-id]`)instanceof HTMLElement||t?.querySelector(`[data-file-tree-id]`)instanceof SVGElement?!0:e.querySelector(`template[shadowrootmode="open"]`)instanceof HTMLTemplateElement}function qi(e,t,n,r,i){let a={...e??{}};if(t!=null&&delete a.header,n){let t=e?.contextMenu,n=t?.onClose,o=t?.onOpen;a.contextMenu={...t??{},enabled:!0,onClose:()=>{n?.(),r()},onOpen:(e,t)=>{i(e,t),o?.(e,t)}},delete a.contextMenu.render}return a.header!=null||a.contextMenu!=null?a:void 0}function Ji({header:e,id:t,model:n,preloadedData:r,renderContextMenu:i,...a}){let[o,s]=(0,Q.useState)(null),[c,l]=(0,Q.useState)(null),u=(0,Q.useRef)(n.getComposition()),d=(0,Q.useRef)(n);d.current!==n&&(d.current=n,u.current=n.getComposition());let f=i!=null,p=(0,Q.useCallback)(()=>{s(null)},[]),m=(0,Q.useCallback)((e,t)=>{s({context:t,item:e})},[]),h=u.current,g=(0,Q.useMemo)(()=>qi(h,e,f,p,m),[h,p,m,f,e]),_=(0,Q.useCallback)(e=>{l(e)},[]);(0,Q.useEffect)(()=>{f||s(null)},[f]),Ui(()=>{n.setComposition(g)},[g,n]),Ui(()=>{if(c!=null)return r!=null&&Ki(c)?n.hydrate({fileTreeContainer:c}):n.render({fileTreeContainer:c}),()=>{n.unmount(),n.setComposition(h)}},[h,c,n,r]);let v=Gi(Wi(e,i,o),r),y=t??r?.id,b={"--trees-item-height":`${String(n.getItemHeight())}px`,"--trees-density-override":n.getDensityFactor(),...a.style};return(0,$.jsx)(j,{...a,id:y,ref:_,style:b,suppressHydrationWarning:r!=null,children:v})}function Yi(e){let[t]=(0,Q.useState)(()=>new Hi(e)),n=(0,Q.useRef)({timeout:null,model:t});return(0,Q.useEffect)(()=>{let{current:e}=n;return e.timeout!=null&&(clearTimeout(e.timeout),e.timeout=null),()=>{e.timeout=setTimeout(()=>e.model.cleanUp(),1)}},[]),{model:t}}function Xi({isLoadingOpenTargets:e=!1,onAddToChat:t,onCopyPath:n,onOpenInTarget:r,primaryTarget:i,targetPath:a,visibleTargets:o}){if(a==null)return[];let s=n==null?`workspace`:`review`,c=[];return n!=null&&c.push({id:`copy-path`,message:u({id:`codex.review.fileTree.contextMenu.copyPath`,defaultMessage:`Copy path`,description:`Context menu action to copy the path of a file tree item`}),onSelect:()=>{n(a)}}),t!=null&&c.push({id:`add-to-chat`,message:u({id:`threadSidePanel.workspaceBrowser.addToChat`,defaultMessage:`Add to chat`,description:`Context menu action for adding a file from the file tree to the current chat`}),onSelect:()=>{t(a)}}),e?[{id:`open-in-loading`,message:$i(s),tooltipMessage:u({id:`threadSidePanel.workspaceBrowser.openIn.loading`,defaultMessage:`Loading available apps…`,description:`Tooltip shown when the file tree is still loading app options for opening a file`}),enabled:!1},{id:`open-in-separator`,type:`separator`},...c]:i==null?c:[...T({idPrefix:Zi(s),messages:Qi(s),onOpenInTarget:(e,t)=>{r(e,t,a)},primaryTarget:i,visibleTargets:o}),{id:`open-in-separator`,type:`separator`},...c]}function Zi(e){switch(e){case`review`:return`review-file-tree-open`;case`workspace`:return`workspace-directory-tree-open`}}function Qi(e){switch(e){case`review`:return{openInTarget:u({id:`codex.review.fileTree.contextMenu.openInTarget`,defaultMessage:`Open in {target}`,description:`Context menu action to open a review file in the preferred app`}),openIn:$i(e),openInTargetSubmenu:u({id:`codex.review.fileTree.contextMenu.openWithTarget`,defaultMessage:`{target}`,description:`Context menu action to open a review file in a specific app`})};case`workspace`:return{openInTarget:u({id:`threadSidePanel.workspaceBrowser.openInTarget`,defaultMessage:`Open in {target}`,description:`Context menu action to open a workspace browser file in the preferred app`}),openIn:$i(e),openInTargetSubmenu:u({id:`threadSidePanel.workspaceBrowser.openInTargetSubmenu`,defaultMessage:`{target}`,description:`Context menu action to open a workspace browser file in a specific app`})}}}function $i(e){switch(e){case`review`:return u({id:`codex.review.fileTree.contextMenu.openWith`,defaultMessage:`Open with`,description:`Context menu submenu label for choosing an app to open a review file`});case`workspace`:return u({id:`threadSidePanel.workspaceBrowser.openIn`,defaultMessage:`Open in…`,description:`Context menu submenu label for choosing an app to open a workspace browser file`})}}function ea(e){for(let t of e.composedPath()){if(!(t instanceof Element)||t.getAttribute(`data-item-type`)!==`file`)continue;let e=t.getAttribute(`data-item-path`);if(e)return e}return null}var ta=r(),na=28,ra=60;function ia(e){let t=(0,ta.c)(97),{cwd:n,decorationIcons:r,flattenEmptyDirectories:a,hostId:o,icons:c,initialExpandedPaths:l,initialScrollTop:u,onClick:d,onDoubleClick:f,onExpandedPathsChange:g,onSelectionChange:v,onStateChange:y,paths:b,revealSelectedPath:x,renderRowDecoration:S,resetKey:T,selectedPath:E,unsafeCSS:D}=e,O=a===void 0?!1:a,j=u===void 0?0:u,M=x===void 0?!1:x,N=w(C()),{platform:P}=_(),F=s(`add-context-file`),te=i(),ne;t[0]!==n||t[1]!==o?(ne={cwd:n,hostId:o},t[0]=n,t[1]=o,t[2]=ne):ne=t[2];let re=k(ne),ie;t[3]===b?ie=t[4]:(ie=b.map(aa),t[3]=b,t[4]=ie);let I=ie,ae;if(t[5]!==n||t[6]!==b||t[7]!==P){ae=new Map;for(let e of b)typeof e!=`string`&&ae.set(e.displayPath,h(n??``,e.path,P===`windows`));t[5]=n,t[6]=b,t[7]=P,t[8]=ae}else ae=t[8];let oe=ae,se;t[9]!==r||t[10]!==c?(se=sa(c,r),t[9]=r,t[10]=c,t[11]=se):se=t[11];let ce=se,le=(0,Q.useRef)(null),ue;t[12]===l?ue=t[13]:(ue=Array.from(l??[]),t[12]=l,t[13]=ue);let de=(0,Q.useRef)(ue),fe=(0,Q.useRef)(null),pe=(0,Q.useRef)(null),L=(0,Q.useRef)(j),me=(0,Q.useRef)(E??null),R;t[14]===y?R=t[15]:(R=()=>{y?.({expandedPaths:de.current,scrollTop:L.current,selectedPath:me.current})},t[14]=y,t[15]=R);let he=p(R),ge;t[16]!==g||t[17]!==he?(ge=e=>{de.current=e,g?.(e),he()},t[16]=g,t[17]=he,t[18]=ge):ge=t[18];let _e=p(ge),ve;t[19]!==v||t[20]!==he?(ve=e=>{me.current=e[0]??null,v?.(e),he()},t[19]=v,t[20]=he,t[21]=ve):ve=t[21];let ye=p(ve),be;t[22]===E?be=t[23]:(be=E==null?void 0:[E],t[22]=E,t[23]=be);let xe=`
      :host {
        --trees-bg-override: var(--color-token-main-surface-primary);
        --trees-bg-muted-override: var(--color-token-list-hover-background);
        --trees-border-color-override: var(--color-token-border);
        --trees-fg-override: var(--color-token-foreground);
        --trees-font-size-override: 13px;
        --trees-focus-ring-color-override: var(--color-token-list-focus-outline);
        --trees-item-padding-x-override: 6px;
        --trees-item-margin-x-override: 0px;
        --trees-level-gap-override: 0px;
        --trees-padding-inline-override: 0px;
        --trees-scrollbar-gutter-override: 0px;
        --trees-scrollbar-gutter-measured: 0px;
        --trees-selected-bg-override: var(--color-token-list-active-selection-background);
        --trees-selected-fg-override: var(--color-token-list-active-selection-foreground);
        --trees-item-row-gap-override: 10px;
      }

      [data-file-tree-sticky-overlay-content='true'],
      [data-file-tree-sticky-row='true'] {
        background-color: var(--color-token-main-surface-primary);
      }

      [data-file-tree-virtualized-scroll='true'] {
        scrollbar-gutter: auto;
      }

      [role="treeitem"] {
        cursor: var(--cursor-interaction) !important;
      }

      [role="treeitem"] * {
        cursor: var(--cursor-interaction) !important;
      }

      [data-item-type='file']:has([data-item-section='content']:empty) {
        display: none;
      }

      ${D??``}
    `,Se;t[24]!==ce||t[25]!==O||t[26]!==ye||t[27]!==l||t[28]!==S||t[29]!==be||t[30]!==xe||t[31]!==I?(Se={fileTreeSearchMode:`hide-non-matches`,flattenEmptyDirectories:O,icons:ce,initialExpandedPaths:l,initialSelectedPaths:be,itemHeight:na,onSelectionChange:ye,paths:I,renderRowDecoration:S,search:!1,stickyFolders:!0,unsafeCSS:xe},t[24]=ce,t[25]=O,t[26]=ye,t[27]=l,t[28]=S,t[29]=be,t[30]=xe,t[31]=I,t[32]=Se):Se=t[32];let{model:z}=Yi(Se),Ce,we;t[33]!==l||t[34]!==z||t[35]!==T||t[36]!==I?(Ce=()=>{let e=Array.from(l??[]),t=fe.current;t!=null&&t.model===z&&t.resetKey===T&&oa(t.treePaths,I)&&oa(t.initialExpandedPaths,e)||(fe.current={initialExpandedPaths:e,model:z,resetKey:T,treePaths:Array.from(I)},de.current=e,pe.current=null,z.resetPaths(I,{initialExpandedPaths:l}))},we=[l,z,T,I],t[33]=l,t[34]=z,t[35]=T,t[36]=I,t[37]=Ce,t[38]=we):(Ce=t[37],we=t[38]),(0,Q.useEffect)(Ce,we);let Te,B;t[39]!==j||t[40]!==z||t[41]!==M||t[42]!==E?(Te=()=>{let e=null,t=0,n=()=>{e=null,!_a(z,j)&&(t>=ra||(t+=1,e=window.requestAnimationFrame(n)))};return j>0&&!(M&&E!=null)?(L.current=j,n()):L.current=0,()=>{e!=null&&window.cancelAnimationFrame(e)}},B=[j,z,M,E],t[39]=j,t[40]=z,t[41]=M,t[42]=E,t[43]=Te,t[44]=B):(Te=t[43],B=t[44]),(0,Q.useEffect)(Te,B);let Ee;t[45]!==z||t[46]!==M||t[47]!==E?(Ee=()=>{if(me.current=E??null,pa(z,E),!M||E==null){pe.current=null;return}pe.current!==E&&ma(z,E)&&(pe.current=E)},t[45]=z,t[46]=M,t[47]=E,t[48]=Ee):Ee=t[48];let De;t[49]!==z||t[50]!==M||t[51]!==E||t[52]!==I?(De=[z,M,E,I],t[49]=z,t[50]=M,t[51]=E,t[52]=I,t[53]=De):De=t[53],(0,Q.useEffect)(Ee,De);let Oe,ke;t[54]!==ce||t[55]!==z?(Oe=()=>{z.setIcons(ce)},ke=[ce,z],t[54]=ce,t[55]=z,t[56]=Oe,t[57]=ke):(Oe=t[56],ke=t[57]),(0,Q.useEffect)(Oe,ke);let Ae,je;t[58]!==_e||t[59]!==z||t[60]!==I?(Ae=()=>z.subscribe(()=>{L.current=ga(z),_e(fa(z,I))}),je=[_e,z,I],t[58]=_e,t[59]=z,t[60]=I,t[61]=Ae,t[62]=je):(Ae=t[61],je=t[62]),(0,Q.useEffect)(Ae,je);let Me,Ne;t[63]!==z||t[64]!==he?(Me=()=>{let e=null,t=0,n=null,r=()=>{e=null;let i=ha(z);if(i!=null){let e=()=>{L.current=i.scrollTop,he()};i.addEventListener(`scroll`,e,{passive:!0}),n=()=>{i.removeEventListener(`scroll`,e)};return}t>=ra||(t+=1,e=window.requestAnimationFrame(r))};return r(),()=>{e!=null&&window.cancelAnimationFrame(e),n?.()}},Ne=[z,he],t[63]=z,t[64]=he,t[65]=Me,t[66]=Ne):(Me=t[65],Ne=t[66]),(0,Q.useEffect)(Me,Ne);let Pe;t[67]!==n||t[68]!==o?(Pe=(0,$.jsx)(A,{cwd:n,hostId:o}),t[67]=n,t[68]=o,t[69]=Pe):Pe=t[69];let Fe;t[70]!==F||t[71]!==n||t[72]!==re||t[73]!==o||t[74]!==te||t[75]!==oe?(Fe=()=>{let e=da(oe,le.current);return Xi({...la({cwd:n,fallbackOpenTargets:re,hostId:o,queryClient:te,targetPath:e}),onAddToChat:o==null?void 0:e=>{F.mutateAsync({hostId:o,path:e})},onCopyPath:ee,onOpenInTarget:(e,t,n)=>{re.open(e,{appPath:t,persistPreferred:!1,path:n})},targetPath:e})},t[70]=F,t[71]=n,t[72]=re,t[73]=o,t[74]=te,t[75]=oe,t[76]=Fe):Fe=t[76];let Ie;t[77]!==n||t[78]!==o||t[79]!==te||t[80]!==oe?(Ie=()=>ua({cwd:n,hostId:o,queryClient:te,targetPath:da(oe,le.current)}),t[77]=n,t[78]=o,t[79]=te,t[80]=oe,t[81]=Ie):Ie=t[81];let Le;t[82]===Symbol.for(`react.memo_cache_sentinel`)?(Le=e=>{le.current=ea(e.nativeEvent)},t[82]=Le):Le=t[82];let Re;t[83]===N?Re=t[84]:(Re={backgroundColor:`var(--color-token-main-surface-primary)`,color:`var(--color-token-foreground)`,colorScheme:N,width:`100%`},t[83]=N,t[84]=Re);let ze;t[85]!==z||t[86]!==d||t[87]!==f||t[88]!==Re?(ze=(0,$.jsx)(Ji,{"data-tab-preview-pin-exempt":!0,onClick:d,onContextMenu:Le,onDoubleClick:f,model:z,style:Re}),t[85]=z,t[86]=d,t[87]=f,t[88]=Re,t[89]=ze):ze=t[89];let Be;t[90]!==Fe||t[91]!==Ie||t[92]!==ze?(Be=(0,$.jsx)(m,{awaitBeforeOpen:!1,getItems:Fe,onBeforeOpen:Ie,children:ze}),t[90]=Fe,t[91]=Ie,t[92]=ze,t[93]=Be):Be=t[93];let Ve;return t[94]!==Pe||t[95]!==Be?(Ve=(0,$.jsxs)($.Fragment,{children:[Pe,Be]}),t[94]=Pe,t[95]=Be,t[96]=Ve):Ve=t[96],Ve}function aa(e){return typeof e==`string`?e:e.displayPath}function oa(e,t){return e.length===t.length?e.every((e,n)=>e===t[n]):!1}function sa(e,t){if(t==null||t.length===0)return e;let n=t.map(e=>`<symbol id="${e.name}" viewBox="${e.viewBox??`0 0 ${e.width??0} ${e.height??0}`}">${e.body}</symbol>`).join(``),r=ca(typeof e==`string`?void 0:e?.spriteSheet,n);return e==null?{set:`complete`,spriteSheet:r}:typeof e==`string`?{set:e,spriteSheet:r}:{...e,spriteSheet:r}}function ca(e,t){return e==null?`<svg data-icon-sprite aria-hidden="true" width="0" height="0" xmlns="http://www.w3.org/2000/svg">${t}</svg>`:e.replace(`</svg>`,`${t}</svg>`)}function la({cwd:e,fallbackOpenTargets:t,hostId:n,queryClient:r,targetPath:i}){if(i==null)return{isLoadingOpenTargets:!1,primaryTarget:null,visibleTargets:[]};let a=o(`open-in-targets`,{cwd:e,hostId:n,path:i}),s=r.getQueryData(a),c=s?.targets??t.targets,l=s?.availableTargets??t.availableTargets,u=s?.preferredTarget??t.preferredTarget,d=s?.mode??t.mode;return{isLoadingOpenTargets:s==null&&!t.hasLoadedTargets&&r.getQueryState(a)?.status!==`error`,primaryTarget:D({preferredTarget:u,targets:c,availableTargets:l,mode:d}),visibleTargets:E({targets:c,availableTargets:l,includeHiddenTargets:!0,mode:d})}}function ua({cwd:e,hostId:t,queryClient:n,targetPath:r}){if(r!=null)return n.prefetchQuery({gcTime:c.INFINITE,queryKey:o(`open-in-targets`,{cwd:e,hostId:t,path:r}),queryFn:()=>a(`open-in-targets`,{params:{cwd:e,hostId:t,path:r}}),staleTime:c.ONE_MINUTE})}function da(e,t){return t==null?null:e.get(t)??t}function fa(e,t){let n=[];for(let r of t){if(!r.endsWith(`/`))continue;let t=r.slice(0,-1),i=e.getItem(t);i==null||!va(i)||!i.isExpanded()||n.push(t)}return n}function pa(e,t){let n=e.getSelectedPaths();if(t==null){for(let t of n)e.getItem(t)?.deselect();return}if(!(n.length===1&&n[0]===t)){for(let t of n)e.getItem(t)?.deselect();e.getItem(t)?.select()}}function ma(e,t){return e.getItem(t)==null?!1:(e.scrollToPath(t,{offset:`top`}),!0)}function ha(e){return e.getFileTreeContainer()?.shadowRoot?.querySelector(`[data-file-tree-virtualized-scroll='true']`)??null}function ga(e){return ha(e)?.scrollTop??0}function _a(e,t){let n=ha(e);return n==null?!1:(n.scrollTop=Math.max(0,t),!0)}function va(e){return e.isDirectory()}function ya(e){let t=(0,ta.c)(23),{autoFocus:n,inputId:r,inputRef:i,onQueryChange:a,searchQuery:o}=e,s=r===void 0?`file-tree-search`:r,c=l(),u;t[0]===Symbol.for(`react.memo_cache_sentinel`)?(u=(0,$.jsx)(d,{id:`codex.fileTreeSearch.label`,defaultMessage:`Filter files`,description:`Label for a file tree filter input`}),t[0]=u):u=t[0];let p;t[1]===s?p=t[2]:(p=(0,$.jsx)(`label`,{className:`sr-only`,htmlFor:s,children:u}),t[1]=s,t[2]=p);let m;t[3]===Symbol.for(`react.memo_cache_sentinel`)?(m=(0,$.jsx)(O,{className:`icon-xs ms-2 shrink-0 text-token-input-placeholder-foreground`}),t[3]=m):m=t[3];let h;t[4]===a?h=t[5]:(h=e=>a(e.target.value),t[4]=a,t[5]=h);let _;t[6]===c?_=t[7]:(_=c.formatMessage({id:`codex.fileTreeSearch.placeholder`,defaultMessage:`Filter files…`,description:`Placeholder text for a file tree filter input`}),t[6]=c,t[7]=_);let v;t[8]!==n||t[9]!==s||t[10]!==i||t[11]!==o||t[12]!==h||t[13]!==_?(v=(0,$.jsx)(`input`,{autoFocus:n,id:s,ref:i,className:`w-full appearance-none border-none bg-transparent py-0 ps-0 pe-1.5 text-token-foreground ring-0 outline-none select-text placeholder:text-token-input-placeholder-foreground focus:border-none focus:ring-0 focus:outline-none [&::placeholder]:select-none`,type:`text`,value:o,onChange:h,placeholder:_}),t[8]=n,t[9]=s,t[10]=i,t[11]=o,t[12]=h,t[13]=_,t[14]=v):v=t[14];let y;t[15]!==c||t[16]!==a||t[17]!==o.length?(y=o.length>0?(0,$.jsx)(f,{"aria-label":c.formatMessage({id:`codex.fileTreeSearch.clear`,defaultMessage:`Clear file filter`,description:`Button label to clear a file tree filter input`}),className:`text-token-input-placeholder-foreground hover:text-token-foreground`,color:`ghost`,size:`icon`,onClick:()=>a(``),children:(0,$.jsx)(g,{className:`icon-2xs`})}):null,t[15]=c,t[16]=a,t[17]=o.length,t[18]=y):y=t[18];let b;return t[19]!==p||t[20]!==v||t[21]!==y?(b=(0,$.jsxs)(`div`,{className:`relative flex h-token-button-composer w-full items-center gap-1.5 rounded-lg border border-token-border bg-token-bg-fog text-base leading-[18px]`,children:[p,m,v,y]}),t[19]=p,t[20]=v,t[21]=y,t[22]=b):b=t[22],b}export{ia as n,ea as r,ya as t};
//# sourceMappingURL=file-tree-search-input-BoeNKn3a.js.map