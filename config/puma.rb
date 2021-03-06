workers Integer(ENV['WEB_CONCURRENCY'] || 2) # WEB_CONCURRENCY this is set up but your dynos status.
threads_count = Integer(ENV['MAX_THREADS'] || 5) 
threads threads_count, threads_count

preload_app!

rackup      DefaultRackup
port        ENV['PORT']     || 5000
environment ENV['RACK_ENV'] || 'development' # RACK_ENV is in your heroku config variables

on_worker_boot do
  # Worker specific setup for Rails 4.1+
  # See: https://devcenter.heroku.com/articles/deploying-rails-applications-with-the-puma-web-server#on-worker-boot
  ActiveRecord::Base.establish_connection
end

