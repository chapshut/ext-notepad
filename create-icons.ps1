Add-Type -AssemblyName System.Drawing

# Create 16x16 icon
$bmp16 = New-Object System.Drawing.Bitmap(16,16)
$g16 = [System.Drawing.Graphics]::FromImage($bmp16)
$g16.Clear([System.Drawing.Color]::FromArgb(76,175,80))
$font16 = New-Object System.Drawing.Font('Arial',10,[System.Drawing.FontStyle]::Bold)
$brush16 = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
$g16.DrawString('N',$font16,$brush16,2,0)
$g16.Dispose()
$bmp16.Save("$PSScriptRoot\images\icon16.png",[System.Drawing.Imaging.ImageFormat]::Png)
$bmp16.Dispose()

# Create 48x48 icon
$bmp48 = New-Object System.Drawing.Bitmap(48,48)
$g48 = [System.Drawing.Graphics]::FromImage($bmp48)
$g48.Clear([System.Drawing.Color]::FromArgb(76,175,80))
$font48 = New-Object System.Drawing.Font('Arial',32,[System.Drawing.FontStyle]::Bold)
$brush48 = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
$g48.DrawString('N',$font48,$brush48,8,4)
$g48.Dispose()
$bmp48.Save("$PSScriptRoot\images\icon48.png",[System.Drawing.Imaging.ImageFormat]::Png)
$bmp48.Dispose()

# Create 128x128 icon
$bmp128 = New-Object System.Drawing.Bitmap(128,128)
$g128 = [System.Drawing.Graphics]::FromImage($bmp128)
$g128.Clear([System.Drawing.Color]::FromArgb(76,175,80))
$font128 = New-Object System.Drawing.Font('Arial',96,[System.Drawing.FontStyle]::Bold)
$brush128 = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
$g128.DrawString('N',$font128,$brush128,20,8)
$g128.Dispose()
$bmp128.Save("$PSScriptRoot\images\icon128.png",[System.Drawing.Imaging.ImageFormat]::Png)
$bmp128.Dispose()

Write-Host "Icons created successfully!"
