$filePath = "src\components\bandobasts\EditBandobastForm.js"
$content = Get-Content $filePath -Raw

# 1. Add dataLoaded state flag
$content = $content -replace '(\[points, setPoints\] = useState\(\[\]\);)', "`$1`r`n  const [dataLoaded, setDataLoaded] = useState(false); // Flag to prevent auto-generation during load"

# 2. Set dataLoaded flag after loading data
$content = $content -replace '(\}\)\)\);[\r\n\s]+\}[\r\n\s]+\}[\r\n\s]+\} catch \(error\) \{[\r\n\s]+console\.error\("Error fetching bandobast data:", error\);)', "}))));`r`n          `r`n          setDataLoaded(true); // Mark data as loaded`r`n        }`r`n      } catch (error) {`r`n        console.error(`"Error fetching bandobast data:`", error);"

# 3. Modify auto-generate points effect
$oldEffect = '  // Auto-generate points based on Total Points value[\r\n\s]+useEffect\(\(\) => \{[\r\n\s]+const totalPointsNum = parseInt\(formData\.totalPoints\) \|\| 0;'
$newEffect = @"
  // Auto-generate points based on Total Points value (skip during initial data load)
  useEffect(() => {
    // Skip if we haven't loaded data yet (for edit mode) or if loading
    if (!dataLoaded && bandobastId) return;
    if (loading) return;
    
    const totalPointsNum = parseInt(formData.totalPoints) || 0;
"@
$content = $content -replace $oldEffect, $newEffect

# 4. Update useEffect dependencies
$content = $content -replace '(\}, \[formData\.totalPoints\]\);)', '}, [formData.totalPoints, dataLoaded, loading]);'

$content | Set-Content $filePath -NoNewline
Write-Host "EditBandobastForm.js updated successfully"
