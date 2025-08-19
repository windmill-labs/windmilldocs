{
  inputs = {
    nixpkgs.url = "nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
    # To update run: `nix flake update nixpkgs-claude`
    nixpkgs-claude.url = "nixpkgs/nixos-unstable";
  };

  outputs = { self, nixpkgs, flake-utils, nixpkgs-claude }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs {
          inherit system;
          config.allowUnfree = true;
        };
        claude-code = (import nixpkgs-claude {
          inherit system;
          config.allowUnfree = true;
        }).claude-code;
      in {
        devShell = pkgs.mkShell {
          buildInputs = with pkgs; [ nodejs git ] ++ [ claude-code ];
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
