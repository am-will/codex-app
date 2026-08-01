require("./src-KMpTO78a.js");const e=require("./crash-reporter-env-D80b9sE5.js");let t=require("node:util"),n=require("node:child_process");var r=(0,t.promisify)(n.execFile),i=e.i(`windows-file-copy`),a=6e4,o=1024*1024,s=6e3,c=String.raw`
Add-Type @"
using System;
using System.ComponentModel;
using System.Runtime.InteropServices;

public static class CodexWindowsFileCopy {
    private const uint COPY_FILE_ALLOW_DECRYPTED_DESTINATION = 0x00000008;

    [DllImport("kernel32.dll", CharSet = CharSet.Unicode, SetLastError = true, EntryPoint = "CopyFileExW")]
    private static extern bool CopyFileEx(
        string lpExistingFileName,
        string lpNewFileName,
        IntPtr lpProgressRoutine,
        IntPtr lpData,
        ref int pbCancel,
        uint dwCopyFlags
    );

    public static void CopyFileAllowDecryptedDestination(string sourcePath, string destinationPath) {
        var cancel = 0;
        if (!CopyFileEx(
            sourcePath,
            destinationPath,
            IntPtr.Zero,
            IntPtr.Zero,
            ref cancel,
            COPY_FILE_ALLOW_DECRYPTED_DESTINATION
        )) {
            throw new Win32Exception(Marshal.GetLastWin32Error());
        }
    }
}
"@
`,l=String.raw`
$ErrorActionPreference = "Stop"

${c}

[CodexWindowsFileCopy]::CopyFileAllowDecryptedDestination(
    $env:CODEX_COPY_SOURCE,
    $env:CODEX_COPY_DESTINATION
)
`,u=String.raw`
$ErrorActionPreference = "Stop"

${c}

$sourceRoot = (Get-Item -LiteralPath $env:CODEX_COPY_SOURCE -Force).FullName.TrimEnd("\")
$destinationRoot = $env:CODEX_COPY_DESTINATION
if ([string]::IsNullOrWhiteSpace($destinationRoot)) {
    throw "Expected CODEX_COPY_DESTINATION."
}

[System.IO.Directory]::CreateDirectory($destinationRoot) | Out-Null
$sourceItems = Get-ChildItem -LiteralPath $sourceRoot -Force -Recurse
# Codex bundles are packaged as regular files; fail instead of silently
# changing Windows link semantics if that ever changes.
$reparsePoint = $sourceItems |
    Where-Object { ($_.Attributes -band [IO.FileAttributes]::ReparsePoint) -ne 0 } |
    Select-Object -First 1
if ($null -ne $reparsePoint) {
    throw "Encrypted resource copy fallback does not support reparse points."
}

foreach ($sourceItem in $sourceItems) {
    $relativePath = $sourceItem.FullName.Substring($sourceRoot.Length).TrimStart("\")
    $destinationPath = Join-Path $destinationRoot $relativePath
    if ($sourceItem.PSIsContainer) {
        [System.IO.Directory]::CreateDirectory($destinationPath) | Out-Null
        continue
    }

    $destinationParent = Split-Path -Parent $destinationPath
    [System.IO.Directory]::CreateDirectory($destinationParent) | Out-Null
    [CodexWindowsFileCopy]::CopyFileAllowDecryptedDestination(
        $sourceItem.FullName,
        $destinationPath
    )
}
`;function d(e,t){return h(u,e,t)}function f(e){return g({...e,copyKind:`directory`,retry:d})}function p(e,t){return h(l,e,t)}function m(e){return g({...e,copyKind:`file`,retry:p})}async function h(t,n,i){await r(`powershell.exe`,[`-NoLogo`,`-NoProfile`,`-NonInteractive`,`-ExecutionPolicy`,`Bypass`,`-EncodedCommand`,v(t)],{encoding:`utf8`,env:{...e.t(process.env),CODEX_COPY_DESTINATION:i,CODEX_COPY_SOURCE:n},maxBuffer:o,timeout:a,windowsHide:!0})}async function g({copy:e,copyKind:t,destination:n,retry:r,source:a}){try{await e()}catch(e){if(process.platform!==`win32`||!_(e))throw e;i.info(`windows_encrypted_copy_fallback_started`,{safe:{copyKind:t,errorCode:s},sensitive:{}});try{await r(a,n)}catch(e){throw i.warning(`windows_encrypted_copy_fallback_failed`,{safe:{copyKind:t,errorCode:s},sensitive:{error:e}}),e}i.info(`windows_encrypted_copy_fallback_succeeded`,{safe:{copyKind:t,errorCode:s},sensitive:{}})}}function _(e){return e instanceof Error&&e.errno===s}function v(e){return Buffer.from(e,`utf16le`).toString(`base64`)}exports.copyDirectoryAllowDecryptedDestinationOnEncryptionFailure=f,exports.copyFileAllowDecryptedDestinationOnEncryptionFailure=m;
//# sourceMappingURL=windows-file-copy-DNg5Avk-.js.map