$filePath = "src\components\bandobasts\EditBandobastForm.js.new"

# Read the file
$content = Get-Content $filePath -Raw

# Fix the syntax error on line 29
$content = $content -replace '`n  const \[loading, setLoading\] = useState\(true\);', "`n  const [loading, setLoading] = useState(true);"

# Find the position after fetchMasterData useEffect and insert fetchBandobastData
$fetchDataFunction = @"

  // Fetch existing bandobast data for editing
  useEffect(() => {
    const fetchBandobastData = async () => {
      if (!bandobastId) return;
      
      try {
        setLoading(true);
        const response = await callApi("get", ``/bandobasts/`${bandobastId}``);
        
        if (response && response.success) {
          const data = response.data;
          
          // Populate form data
          setFormData({
            bandobastName: data.bandobast_name || "",
            bandobastType: data.bandobast_type_id?.toString() || "",
            priorityLevel: data.priority_id?.toString() || "",
            eventDate: data.start_date || "",
            eventStartTime: data.start_time || "",
            eventEndTime: data.end_time || "",
            location: data.location || "",
            district: data.district || "",
            taluka: data.city_taluka || "",
            village: data.village || "",
            landmark: data.landmark || "",
            eventName: data.vip_event_name || "",
            eventDescription: data.event_description || "",
            vipName: data.vip_name || "",
            vipCategory: data.vip_category_id?.toString() || "",
            expectedCrowd: data.expected_crowd?.toString() || "",
            threatLevel: data.threat_level_id?.toString() || "",
            intelligenceNotes: data.intelligence_notes || "",
            totalOfficers: data.total_force?.toString() || "",
            totalPoints: data.total_points?.toString() || "",
            totalAreas: data.total_areas?.toString() || "",
            shiftType: data.shift_type || "Single",
            assignmentMode: data.assignment_mode || "",
            reportingOfficer: data.reporting_officer || "",
            backupOfficer: data.backup_officer || "",
            replacementAllowed: data.replacement_allowed || false,
            approvingAuthority: data.approving_authority_id?.toString() || "",
            remarks: data.remarks || "",
            generalInstructions: data.general_instructions || "",
            pointwiseInstructions: data.pointwise_instructions || "",
            emergencyProtocol: data.emergency_protocol || "",
            uniformType: data.uniform_type || "",
            groupChatEnabled: data.group_chat_enabled || false,
            emergencyBroadcast: data.emergency_broadcast || false,
            language: data.language || "",
            liveLocationTracking: data.live_location_tracking || false,
            geoFencingEnabled: data.geo_fencing_enabled || false,
            locationUpdateInterval: data.location_update_interval || "",
            attendanceMode: data.attendance_mode || "",
            autoReportGeneration: data.auto_report_generation || false,
            incidentLogging: data.incident_logging || false,
            photoVideoUpload: data.photo_video_upload || false,
            feedbackRequired: data.feedback_required || false
          });
          
          // Populate staff list
          if (data.staff && Array.isArray(data.staff)) {
            setStaffList(data.staff.map(s => ({
              name: s.name,
              mobileNumber: s.mobile_number,
              buckleNumber: s.buckle_number,
              designation: s.designation,
              dutyLocation: s.duty_location
            })));
          }
          
          // Populate points with assigned officers
          if (data.points && Array.isArray(data.points)) {
            setPoints(data.points.map(p => ({
              id: p.id,
              pointName: p.point_name,
              location: p.location,
              latitude: p.latitude || "",
              longitude: p.longitude || "",
              officersRequired: p.officers_required || 0,
              assignedOfficers: (p.assignedOfficers || []).map(o => ({
                id: o.id,
                staffId: o.name,
                name: o.name,
                mobileNumber: o.mobile_number,
                buckleNumber: o.buckle_number,
                designation: o.designation,
                dutyLocation: o.duty_location
              }))
            })));
          }
        }
      } catch (error) {
        console.error("Error fetching bandobast data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBandobastData();
  }, [bandobastId]);
"@

# Insert after the fetchMasterData useEffect (after line 131)
$content = $content -replace '(fetchMasterData\(\);\s+\}, \[\]\);)', "`$1$fetchDataFunction"

# Save the modified content
$content | Set-Content $filePath -NoNewline

Write-Host "File modified successfully"
