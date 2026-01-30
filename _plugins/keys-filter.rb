module Jekyll
    module KeysFilter
        def hash_keys(input)
            return input.keys.join(", ")
        end
    end
end

if ENV['JEKYLL_ENV'] == 'development'
    # Only make it available in dev. This should cause errors in prod in case
    # you forgot the pipe somewhere
    Liquid::Template.register_filter(Jekyll::KeysFilter)
end