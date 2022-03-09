rm -rf build
mkdir -p build
cd build
curl -s -L https://github.com/windmill-labs/windmill/tarball/main | tar -xz
python ../generate_public_templates.py
