{
  description = "Nix flake for the unofficial Codex desktop app for Linux";

  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";

  outputs =
    { self, nixpkgs }:
    let
      system = "x86_64-linux";
      pkgs = import nixpkgs {
        inherit system;
        config.allowUnfree = true;
      };
      lib = pkgs.lib;

      packageJson = builtins.fromJSON (builtins.readFile ./desktop/package.json);
      version = packageJson.version;
      pname = "codex-app";
      releaseAssetBaseName = "codex-app-linux-v${version}";
      releaseAssetPath = ./. + "/desktop/out/release-assets/${releaseAssetBaseName}.AppImage";

      # Package the tracked Linux release artifact directly instead of rebuilding Electron.
      src =
        if builtins.pathExists releaseAssetPath then
          releaseAssetPath
        else
          throw ''
            Missing desktop/out/release-assets/${releaseAssetBaseName}.AppImage.
            Build or sync the current Linux release assets before evaluating this flake.
          '';

      extracted = pkgs.appimageTools.extractType2 {
        inherit pname version src;
      };

      package = pkgs.appimageTools.wrapType2 {
        inherit pname version src;

        extraInstallCommands = ''
          install -Dm444 ${extracted}/Codex.desktop $out/share/applications/codex-app.desktop
          substituteInPlace $out/share/applications/codex-app.desktop \
            --replace-fail 'Exec=Codex %U' 'Exec=codex-app %U'

          install -Dm444 ${extracted}/codex-desktop.png $out/share/pixmaps/codex-desktop.png

          ln -s $out/bin/codex-app $out/bin/codex
        '';

        meta = with lib; {
          description = "Codex desktop app packaged from the Linux AppImage tracked in this repo";
          license = licenses.unfree;
          platforms = [ system ];
          mainProgram = "codex-app";
        };
      };
    in
    {
      packages.${system} = {
        default = package;
        codex = package;
        codex-app = package;
      };

      apps.${system} = {
        default = {
          type = "app";
          program = "${package}/bin/codex-app";
        };
        codex = self.apps.${system}.default;
        codex-app = self.apps.${system}.default;
      };
    };
}
