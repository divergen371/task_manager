FROM php:8.1.0-fpm-alpine

# PostgreSQL用のPDOドライバとxdebugをインストール
RUN apk --no-cache add --virtual .build-deps $PHPIZE_DEPS postgresql-dev nginx supervisor linux-headers \
    && apk add --no-cache postgresql-dev nginx supervisor \
    && docker-php-ext-install pdo_pgsql pdo \
    && pecl install xdebug \
    && docker-php-ext-enable xdebug \
    && apk del .build-deps

# アプリケーションのソースコードをコピー

COPY . /var/www/html/

# Nginxの設定ファイルをコピー

COPY nginx.conf /etc/nginx/nginx.conf

# Supervisorの設定ファイルをコピー

# Xdebugの設定をコピー

COPY xdebug.ini /usr/local/etc/php/conf.d/xdebug.ini

COPY supervisord.conf /etc/supervisord.conf

# エントリーポイントのスクリプトをコピー

COPY docker-entrypoint.sh /usr/local/bin/

# エントリーポイントのスクリプトをに実行権限を付与する

RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# ワーキングディレクトリを設定

WORKDIR /var/www/html

# デフォルトのコマンドを設定

CMD [ "docker-entrypoint.sh" ]
