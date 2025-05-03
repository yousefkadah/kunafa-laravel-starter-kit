#!/bin/bash

# Source directories
SOURCE_DIR=~/Desktop/webDevelopment/kunafa-dashboard-vue
DEST_DIR=~/Desktop/webDevelopment/kunafa-laravel-starter-kit/stubs

# Create necessary directories
mkdir -p $DEST_DIR/js
mkdir -p $DEST_DIR/css
mkdir -p $DEST_DIR/images
mkdir -p $DEST_DIR/config

# Copy Vue components and JavaScript files
cp -r $SOURCE_DIR/src/* $DEST_DIR/js/
cp $SOURCE_DIR/index.html $DEST_DIR/js/

# Copy CSS files
cp -r $SOURCE_DIR/css/* $DEST_DIR/css/

# Copy images
cp -r $SOURCE_DIR/images/* $DEST_DIR/images/

# Copy configuration files
cp $SOURCE_DIR/tailwind.config.js $DEST_DIR/config/
cp $SOURCE_DIR/postcss.config.cjs $DEST_DIR/config/
cp $SOURCE_DIR/vueform.config.js $DEST_DIR/config/

# Create app.js entry file for Laravel
cat > $DEST_DIR/js/app.js << 'EOF'
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import { i18n } from './libs/i18n';
import IconifyPlugin from './plugins/iconifyPlugin';

// Import CSS
import '../css/style.scss';                     

// Create app
const app = createApp(App);

// Use plugins
app.use(router);
app.use(createPinia());
app.use(i18n);
app.use(IconifyPlugin);

// Mount app
app.mount('#app');
EOF

echo "Stubs built successfully!"
