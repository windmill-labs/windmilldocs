mkdir -p build
cd build
curl -L https://github.com/windmill-labs/windmill/tarball/main | tar -xz
python ../generate_public_templates.py
