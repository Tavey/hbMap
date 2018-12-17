npm  --no-git-tag-version version patch
tag=$(git branch | sed -n '/\* /s///p')
npm  publish --tag $tag


echo 'Publish Success'