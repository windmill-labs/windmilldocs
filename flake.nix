{
  inputs = {
    nixpkgs.url = "nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs {
          inherit system;
          config.allowUnfree = true;
        };
      in {
        devShell = pkgs.mkShell {
          buildInputs = with pkgs; [ nodejs ];
          shellHook = ''
            echo ""
            echo "1. wm-setup"
            echo "2. wm-dev"
            echo ""
          '';

          packages = [
            (pkgs.writeScriptBin "wm-setup" ''
              ${pkgs.nodejs}/bin/npm i --legacy-peer-deps
            '')
            # Start dev server
            (pkgs.writeScriptBin "wm-dev" ''
              ${pkgs.nodejs}/bin/npm start
            '')
            # TODO:
            # (pkgs.writeScriptBin "wm-build" ''
            #   ${pkgs.nodejs}/bin/npm run build
            # '')
            # (pkgs.writeScriptBin "wm-check" "")
          ];
        };
      });
}
