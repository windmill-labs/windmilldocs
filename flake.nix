{
  inputs = {
    nixpkgs.url = "nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
    rust-overlay.url = "github:oxalica/rust-overlay";
  };

  outputs = {
    nixpkgs,
    flake-utils,
    ...
  }:
    flake-utils.lib.eachDefaultSystem (system: let
      pkgs = import nixpkgs {
        inherit system;
      };
      buildInputs = with pkgs; [
        # dev libxml2.dev xmlsec.dev libxslt.dev libtool
        nodejs
      ];
    in {
      devShell = pkgs.mkShell {
        buildInputs =
          buildInputs
          ++ (with pkgs; [
            git
          ]);
      };
    });
}
