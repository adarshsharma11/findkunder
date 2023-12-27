<!DOCTYPE html>
<html lang='en'>
    <head>
        <meta charset='utf-8'>
        <meta name='description' content='Fuse React - Material design admin template with pre-built apps and pages'>
        <meta name='keywords'
              content='React,Redux,Material UI Next,Material,Material Design,Google Material Design,HTML,CSS,Firebase,Authentication,Material Redux Theme,Material Redux Template'>
        <meta name='author' content='Withinpixels'>
        <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no'>
        <meta name='theme-color' content='#000000'>
        <base href='/'>
        <link href="/css/app.css" rel="stylesheet">

        <link href="{{ asset('/assets/tailwind-base.css') }}" rel='stylesheet'>

        <!--
          manifest.json provides metadata used when your web app is added to the
          homescreen on Android. See https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/
        -->
        <link href="{{ asset('/assets/manifest.json') }}" rel='stylesheet'>
        <link href="{{ asset('/assets/favicon.ico') }}" rel='stylesheet'>

        <!--<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">-->

        <!--        You can choose main icon from variety of the material ui icon fonts-->
        <link href="{{ asset('/assets/fonts/material-design-icons/MaterialIconsOutlined.css') }}" rel='stylesheet'>
        <!--        <link href="%PUBLIC_URL%/assets/fonts/material-design-icons/MaterialIcons.css" rel="stylesheet">-->
        <!--        <link href="%PUBLIC_URL%/assets/fonts/material-design-icons/MaterialIconsRound.css" rel="stylesheet">-->
        <!--        <link href="%PUBLIC_URL%/assets/fonts/material-design-icons/MaterialIconsSharp.css" rel="stylesheet">-->
        <!--        <link href="%PUBLIC_URL%/assets/fonts/material-design-icons/MaterialIconsTwoTone.css" rel="stylesheet">-->

        <link href="{{ asset('/assets/fonts/inter/inter.css') }}" rel='stylesheet'>
        <link href="{{ asset('/assets/fonts/meteocons/style.css') }}" rel='stylesheet'>

        <noscript id='emotion-insertion-point'></noscript>
        <!--
          Notice the use of %PUBLIC_URL% in the tags above.
          It will be replaced with the URL of the `public` folder during the build.
          Only files inside the `public` folder can be referenced from the HTML.

          Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
          work correctly both with client-side routing and a non-root public URL.
          Learn how to configure a non-root public URL by running `npm run build`.
        -->
        <title>Findkunder Admin</title>
        @viteReactRefresh
        @vite('resources/js/app.tsx')

        <!-- FUSE Splash Screen CSS -->
        <style>
            body #fuse-splash-screen {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: #111827;
                color: #F9FAFB;
                z-index: 999999;
                pointer-events: none;
                opacity: 1;
                visibility: visible;
                transition: opacity 400ms cubic-bezier(0.4, 0, 0.2, 1);
            }

            body #fuse-splash-screen img {
                width: 120px;
                max-width: 120px;
            }

            #spinner {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-top: 40px;
                width: 56px;
            }

            #spinner > div {
                width: 12px;
                height: 12px;
                background-color: #1E96F7;
                border-radius: 100%;
                display: inline-block;
                -webkit-animation: fuse-bouncedelay 1s infinite ease-in-out both;
                animation: fuse-bouncedelay 1s infinite ease-in-out both;
            }

            #spinner .bounce1 {
                -webkit-animation-delay: -0.32s;
                animation-delay: -0.32s;
            }

           #spinner .bounce2 {
                -webkit-animation-delay: -0.16s;
                animation-delay: -0.16s;
            }

            @-webkit-keyframes fuse-bouncedelay {
                0%, 80%, 100% {
                    -webkit-transform: scale(0)
                }
                40% {
                    -webkit-transform: scale(1.0)
                }
            }

            @keyframes fuse-bouncedelay {
                0%, 80%, 100% {
                    -webkit-transform: scale(0);
                    transform: scale(0);
                }
                40% {
                    -webkit-transform: scale(1.0);
                    transform: scale(1.0);
                }
            }


        </style>
        <!-- / FUSE Splash Screen CSS -->
    </head>
    <body>

    <noscript>
        You need to enable JavaScript to run this app.
    </noscript>

    <div id='root' class='flex'>
        <!-- FUSE Splash Screen -->
        <div id='fuse-splash-screen'>
            <div class='logo'>
                <img width='128' src='assets/images/logo/logo.svg' alt='logo'>
            </div>
            <div id='spinner'>
                <div class='bounce1'></div>
                <div class='bounce2'></div>
                <div class='bounce3'></div>
            </div>
        </div>
        <!-- / FUSE Splash Screen -->
    </div>
    <!--
      This HTML file is a template.
      If you open it directly in the browser, you will see an empty page.

      You can add webfonts, meta tags, or analytics to this file.
      The build step will place the bundled scripts into the <body> tag.

      To begin the development, run `npm start` or `yarn start`.
      To create a production bundle, use `npm run build` or `yarn build`.
    -->
    </body>
       <!-- Call our app script -->
       <!-- <script src="{{ asset('js/app.js') }}" defer></script> -->
</html>
