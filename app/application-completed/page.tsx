'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useDropzone } from 'react-dropzone'
import { Header } from '@/components/header'
import { ProgressBar } from '@/components/progress-bar'
import { SkeletonLoader } from '@/components/skeleton-loader'
import { CTAButton } from '@/components/cta-button'
import { Clock7Icon, Mail, FileCheckIcon, CheckIcon, MessageCircleQuestionIcon, Check, ChevronDown, Eye, EyeOff, X, Upload, Loader2, Download } from 'lucide-react'

export default function ApplicationCompletedPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [expandedAccordion, setExpandedAccordion] = useState(null)
  const [completedSections, setCompletedSections] = useState({
    supporting: false,
    industry: false,
    references: false,
  })
  const [formData, setFormData] = useState({
    businessCompanyName: '',
    businessContactName: '',
    businessContactPhone: '',
    businessRelationship: '',
    personalContactName: '',
    personalContactPhone: '',
    personalRelationship: '',
    hearAboutUs: '',
    ein: '',
    industryType: '',
    industrySubtype: '',
  })
  const [showEIN, setShowEIN] = useState(false)
  const [supportingDocsComplete, setSupportingDocsComplete] = useState(false)
  const [selectedDocuments, setSelectedDocuments] = useState({
    business: false,
    platform: false,
    payment: false,
    merchant: false,
  })
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [validationError, setValidationError] = useState(null)
  const [einError, setEinError] = useState('')
  const [isSavingIndustry, setIsSavingIndustry] = useState(false)
  const [referencesErrors, setReferencesErrors] = useState({
    businessCompanyName: '',
    businessContactName: '',
    businessContactPhone: '',
    businessRelationship: '',
    personalContactName: '',
    personalContactPhone: '',
    personalRelationship: '',
  })

  const [showHearAboutUsDropdown, setShowHearAboutUsDropdown] = useState(false)
  const [showIndustryDropdown, setShowIndustryDropdown] = useState(false)
  const [showSubIndustryDropdown, setShowSubIndustryDropdown] = useState(false)
  const hearAboutUsRef = useRef<HTMLDivElement>(null)
  const industryRef = useRef<HTMLDivElement>(null)
  const subIndustryRef = useRef<HTMLDivElement>(null)
  const [hearAboutUsHighlighted, setHearAboutUsHighlighted] = useState(-1)
  const [industryHighlighted, setIndustryHighlighted] = useState(-1)
  const [subIndustryHighlighted, setSubIndustryHighlighted] = useState(-1)

  const hearAboutUsOptions = [
    'Social media',
    'Google search',
    'Friend and family',
    'Email',
    'Radio/Podcast',
    'TV/Streaming Ad',
    'Other'
  ]

  const industryOptions = [
    'Child and Elder Care',
    'Construction / Trades',
    'Food & Beverage',
    'Healthcare',
    'Professional Services',
    'Retail / E-Commerce',
    'Transportation / Logistics',
    'Technology',
    'Beauty / Personal Care',
    'Education / Tutoring',
    'Other'
  ]

  // Industry sub-types mapping
  const industrySubtypes = {
    'child-elder-care': ['Select a sub-industry', 'Daycare Center', 'Home Health Aide', 'Assisted Living', 'Nanny Services', 'Other'],
    'construction-trades': ['Select a sub-industry', 'General Contractor', 'Electrician', 'Plumbing', 'HVAC', 'Painting', 'Roofing', 'Other'],
    'food-beverage': ['Select a sub-industry', 'Restaurant', 'Food Truck', 'Catering', 'Bakery', 'Bar / Lounge', 'Other'],
    'healthcare': ['Select a sub-industry', 'Dental', 'Chiropractic', 'Medical Practice', 'Pharmacy', 'Mental Health', 'Other'],
    'professional-services': ['Select a sub-industry', 'Accounting', 'Legal', 'Consulting', 'Marketing Agency', 'Real Estate', 'Other'],
    'retail-ecommerce': ['Select a sub-industry', 'Clothing', 'Electronics', 'Home Goods', 'Specialty Retail', 'Online Store', 'Other'],
    'transportation-logistics': ['Select a sub-industry', 'Trucking', 'Courier / Delivery', 'Rideshare', 'Moving Services', 'Other'],
    'technology': ['Select a sub-industry', 'Software / SaaS', 'IT Services', 'Web Development', 'App Development', 'Other'],
    'beauty-personal-care': ['Select a sub-industry', 'Salon', 'Barbershop', 'Spa', 'Nail Salon', 'Tattoo Studio', 'Other'],
    'education-tutoring': ['Select a sub-industry', 'Tutoring Service', 'Online Courses', 'Training Center', 'Music Lessons', 'Other'],
  }

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (hearAboutUsRef.current && !hearAboutUsRef.current.contains(event.target as Node)) {
        setShowHearAboutUsDropdown(false)
      }
      if (industryRef.current && !industryRef.current.contains(event.target as Node)) {
        setShowIndustryDropdown(false)
      }
      if (subIndustryRef.current && !subIndustryRef.current.contains(event.target as Node)) {
        setShowSubIndustryDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // EIN validation: XX-XXXXXXX
  const validateEIN = (value) => {
    const einRegex = /^\d{2}-\d{7}$/
    if (value && !einRegex.test(value)) {
      return 'EIN must be in format: XX-XXXXXXX'
    }
    return ''
  }

  // Format EIN display with asterisks and last digit visible
  const formatEINDisplay = (ein) => {
    if (!ein) return ''
    if (ein.length <= 1) return ein
    // Show asterisks for first 8 characters and the last digit
    const masked = '*'.repeat(Math.min(ein.length - 1, 8))
    const lastChar = ein[ein.length - 1]
    return masked + lastChar
  }

  const isIndustryDetailsValid = () => {
    return (
      formData.hearAboutUs.trim() &&
      formData.ein.trim() &&
      !einError &&
      formData.industryType.trim() &&
      (formData.industryType === 'other' || formData.industrySubtype.trim())
    )
  }

  // References validation functions
  const validateCompanyName = (value) => {
    if (!value.trim()) {
      return 'Company name is required'
    }
    if (!/^[a-zA-Z\s]*$/.test(value)) {
      return 'Company name must contain only letters'
    }
    if (value.trim().length < 2) {
      return 'Company name must be at least 2 characters'
    }
    return ''
  }

  const validateContactName = (value) => {
    if (!value.trim() || value.trim().length < 3) {
      return 'Contact name must be at least 3 characters'
    }
    if (!/^[a-zA-Z\s]*$/.test(value)) {
      return 'Contact name must contain only letters'
    }
    return ''
  }

  const validatePhoneNumber = (value) => {
    if (!value.trim()) {
      return 'Phone number is required'
    }
    // Validate: (XXX)XXX-XXXX format
    if (!/^\(\d{3}\)\d{3}-\d{4}$/.test(value)) {
      return 'Phone format must be (XXX)XXX-XXXX'
    }
    return ''
  }

  const validateRelationship = (value) => {
    if (!value.trim() || value.trim().length < 3) {
      return 'Relationship must be at least 3 characters'
    }
    if (!/^[a-zA-Z\s]*$/.test(value)) {
      return 'Relationship must contain only letters'
    }
    return ''
  }

  const onDrop = (acceptedFiles) => {
    setValidationError(null)
    
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0]
      
      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        setValidationError('File size must be less than 2MB')
        return
      }
      
      // Validate total files
      if (uploadedFiles.length >= MAX_FILES) {
        setValidationError('Maximum 10 files allowed')
        return
      }
      
      const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2)
      setUploadedFiles(prev => [
        ...prev,
        {
          id: Date.now(),
          name: file.name,
          size: fileSizeMB,
        }
      ])
    }
  }

  const { getRootProps, getInputProps, isDragActive: isDropzoneActive } = useDropzone({
    onDrop,
  })

  useEffect(() => {
    // Dynamically import canvas-confetti
    import('canvas-confetti').then((confetti) => {
      confetti.default({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        duration: 3000,
      })
    })
  }, [])

  const handleContinue = () => {
    setIsSubmitting(true)
    setTimeout(() => {
      router.push('/income')
    }, 300)
  }

  const toggleAccordion = (item) => {
    setExpandedAccordion(expandedAccordion === item ? null : item)
  }

  const handleInputChange = (field, value) => {
    // Filter characters based on field type
    let filteredValue = value
    
    // EIN: Only numbers and hyphen
    if (field === 'ein') {
      // Remove all non-digits first
      const digitsOnly = value.replace(/\D/g, '')
      
      // Auto-format: XX-XXXXXXX (max 9 digits)
      if (digitsOnly.length <= 2) {
        filteredValue = digitsOnly
      } else if (digitsOnly.length <= 9) {
        filteredValue = digitsOnly.slice(0, 2) + '-' + digitsOnly.slice(2)
      } else {
        filteredValue = digitsOnly.slice(0, 2) + '-' + digitsOnly.slice(2, 9)
      }
    }
    // Company Name: Only letters and spaces
    else if (field === 'businessCompanyName') {
      filteredValue = value.replace(/[^a-zA-Z\s]/g, '')
    }
    // Contact Name: Only letters and spaces
    else if (field === 'businessContactName' || field === 'personalContactName') {
      filteredValue = value.replace(/[^a-zA-Z\s]/g, '')
    }
    // Phone: Only numbers, auto-format to (XXX)XXX-XXXX
    else if (field === 'businessContactPhone' || field === 'personalContactPhone') {
      // Remove all non-digits
      const digitsOnly = value.replace(/\D/g, '')
      
      // Auto-format: (XXX)XXX-XXXX
      if (digitsOnly.length <= 3) {
        filteredValue = digitsOnly.length > 0 ? '(' + digitsOnly : ''
      } else if (digitsOnly.length <= 6) {
        filteredValue = '(' + digitsOnly.slice(0, 3) + ')' + digitsOnly.slice(3)
      } else if (digitsOnly.length <= 10) {
        filteredValue = '(' + digitsOnly.slice(0, 3) + ')' + digitsOnly.slice(3, 6) + '-' + digitsOnly.slice(6)
      } else {
        filteredValue = '(' + digitsOnly.slice(0, 3) + ')' + digitsOnly.slice(3, 6) + '-' + digitsOnly.slice(6, 10)
      }
    }
    // Relationship: Only letters and spaces
    else if (field === 'businessRelationship' || field === 'personalRelationship') {
      filteredValue = value.replace(/[^a-zA-Z\s]/g, '')
    }
    
    setFormData(prev => ({ ...prev, [field]: filteredValue }))
    
    // Validate EIN on change
    if (field === 'ein') {
      const error = validateEIN(filteredValue)
      setEinError(error)
    }
    
    // Validate References fields
    if (field === 'businessCompanyName') {
      setReferencesErrors(prev => ({ ...prev, businessCompanyName: validateCompanyName(filteredValue) }))
    } else if (field === 'businessContactName') {
      setReferencesErrors(prev => ({ ...prev, businessContactName: validateContactName(filteredValue) }))
    } else if (field === 'businessContactPhone') {
      setReferencesErrors(prev => ({ ...prev, businessContactPhone: validatePhoneNumber(filteredValue) }))
    } else if (field === 'businessRelationship') {
      setReferencesErrors(prev => ({ ...prev, businessRelationship: validateRelationship(filteredValue) }))
    } else if (field === 'personalContactName') {
      setReferencesErrors(prev => ({ ...prev, personalContactName: validateContactName(filteredValue) }))
    } else if (field === 'personalContactPhone') {
      setReferencesErrors(prev => ({ ...prev, personalContactPhone: validatePhoneNumber(filteredValue) }))
    } else if (field === 'personalRelationship') {
      setReferencesErrors(prev => ({ ...prev, personalRelationship: validateRelationship(filteredValue) }))
    }
  }

  const handleUpload = () => {
    // Check if all references fields are filled
    const allFilled = 
      formData.businessCompanyName.trim() &&
      formData.businessContactName.trim() &&
      formData.businessContactPhone.trim() &&
      formData.businessRelationship.trim() &&
      formData.personalContactName.trim() &&
      formData.personalContactPhone.trim() &&
      formData.personalRelationship.trim()

    if (allFilled) {
      setCompletedSections(prev => ({ ...prev, references: true }))
      setExpandedAccordion(null)
    }
  }

  const handleSaveIndustryDetails = async () => {
    if (!isIndustryDetailsValid()) return

    setIsSavingIndustry(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setCompletedSections(prev => ({ ...prev, industry: true }))
      setExpandedAccordion(null)
    } finally {
      setIsSavingIndustry(false)
    }
  }

  const isReferencesComplete = completedSections.references
  const isIndustryComplete = completedSections.industry
  const isSupportingComplete = completedSections.supporting

  const handleUploadSupportingDocs = () => {
    setCompletedSections(prev => ({ ...prev, supporting: true }))
    setExpandedAccordion(null)
  }

  const toggleDocumentSelection = (docType) => {
    setPendingDocType(docType)
    fileInputRef.current?.click()
  }

  const handleDocumentUpload = (e) => {
    const file = e.target.files?.[0]
    if (file && pendingDocType) {
      const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2)
      setUploadedFiles(prev => [
        ...prev,
        {
          id: Date.now(),
          name: file.name,
          size: fileSizeMB,
          type: pendingDocType,
        }
      ])
      setSelectedDocuments(prev => ({ ...prev, [pendingDocType]: true }))
      setPendingDocType(null)
    }
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const removeFile = (fileId) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId))
  }

  const handleDownloadFile = (file) => {
    // Create a data URL from the file
    const url = URL.createObjectURL(file.file)
    const link = document.createElement('a')
    link.href = url
    link.download = file.name
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-[#f7f9fd]">
      <Header />

      <div className="px-4 lg:px-8 mt-6 lg:mt-8">
        <div className="max-w-7xl mx-auto">
          <ProgressBar progress={100} />
        </div>
      </div>

      <main className="px-4 lg:px-8 py-6 lg:py-8">
        <div className="max-w-md mx-auto space-y-8">
          {/* Illustration */}
          <div className="flex justify-center">
            <svg className="w-[150px] h-[98px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="95" fill="#16a34a"/>
              <path className="text-center" d="M70 100 L85 115 L130 70" stroke="white" strokeWidth="12" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          {/* Title and Description */}
          <div>
            <h1 className="text-3xl lg:text-4xl text-[#05055c] font-serif mb-4 text-blue-900 font-bold text-center">
              You are all set!
            </h1>
            <p className="text-gray-600 text-center text-base">
              Your application is currently under review. 
            </p>
          </div>

          {/* Info Cards */}
          <div className="p-6 border-2 border-gray-300 rounded-3xl space-y-3 shadow-md bg-slate-100">
            <h2 className="font-bold text-gray-900 mb-4 text-xl font-serif">What's next?</h2>
            
            {/* Item 1 */}
            <div className="flex gap-4 text-xs">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-transparent">
                  <Clock7Icon className="w-5 h-5 text-cyan-500" />
                </div>
              </div>
              <div>
                <p className="text-gray-800 text-base">Our team reviews your application within 24-48 hours.</p>
              </div>
            </div>

            {/* Item 2 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-transparent">
                  <Mail className="w-5 h-5 text-green-600" />
                </div>
              </div>
              <div>
                <p className="text-gray-800 text-base">You'll receive an email with our decision</p>
              </div>
            </div>

            {/* Item 3 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-transparent">
                  <MessageCircleQuestionIcon className="w-5 h-5 text-black" />
                </div>
              </div>
              <div>
                <p className="text-gray-800 text-base">We may reach out if we need additional information</p>
              </div>
            </div>
          </div>

          {/* Optional Steps Section */}
          <div className="text-center">
            <h3 className="font-bold text-gray-900 mb-2 font-serif text-xl text-left">Speed up your Application!</h3>
            <p className="text-gray-600 text-base text-left">{"Optional information that can help us process your application faster and improve your offers.\n"}</p>
          </div>

          {/* Accordion */}
          <div className="space-y-3">
            {/* Supporting Documents - Expandable */}
            <div className={`border rounded-2xl overflow-hidden transition-all ${isSupportingComplete ? 'border-gray-200 bg-white' : expandedAccordion === 'supporting' ? 'border-blue-300 bg-blue-50' : 'border-gray-200 bg-white'}`}>
              <button
                onClick={() => toggleAccordion('supporting')}
                className={`w-full p-4 flex items-center gap-3 transition-colors ${expandedAccordion === 'supporting' ? 'hover:bg-blue-100' : 'hover:bg-gray-50'}`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${isSupportingComplete ? 'bg-green-500' : 'bg-slate-300'}`}>
                  {isSupportingComplete ? (
                    <Check className="w-4 h-4 text-white" />
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  )}
                </div>
                <span className="text-gray-900 font-medium flex-1 text-left font-sans flex items-center gap-2">
                  Supporting Documents
                  <span className="px-2 py-1 bg-gray-200 text-gray-700 text-xs font-medium rounded-full">Optional</span>
                </span>
                <ChevronDown className={`w-5 h-5 ${isSupportingComplete ? 'text-gray-400' : 'text-blue-500'} transition-transform ${expandedAccordion === 'supporting' ? 'rotate-180' : ''}`} />
              </button>

              {expandedAccordion === 'supporting' && (
                <div className="px-4 space-y-4 bg-white rounded-b-xl pl-6 pr-6 pt-6 pb-6">
                  <h3 className="text-gray-900 font-normal text-base">{"Platform profiles or business verification documents\n"}</h3>
                  
                  {/* Option 1: Document Cards Grid (Informational Only) */}
                  <div className="grid grid-cols-2 gap-3 auto-rows-fr">
                    {/* Business Documents */}
                    <div className="p-4 border border-gray-300 rounded-2xl bg-gray-100">
                      <FileCheckIcon className="w-6 h-6 mb-3 text-green-600" />
                      <h4 className="font-bold text-gray-900 text-sm mb-1 font-serif">Business documents</h4>
                      <p className="text-gray-700 text-xs">EIN letter, SOS registration and latest tax return.</p>
                    </div>

                    {/* Platform or App Profile */}
                    <div className="p-4 border border-gray-300 rounded-2xl bg-gray-100">
                      <FileCheckIcon className="w-6 h-6 mb-3 text-green-600" />
                      <h4 className="font-bold text-gray-900 text-sm mb-1 font-serif">Platform or App profile</h4>
                      <p className="text-gray-700 text-xs">Paypal, CashApp, Uber, Lyft</p>
                    </div>

                    {/* Payment Verification */}
                    <div className="p-4 border border-gray-300 rounded-2xl bg-gray-100">
                      <FileCheckIcon className="w-6 h-6 mb-3 text-green-600" />
                      <h4 className="font-bold text-gray-900 text-sm mb-1 font-serif">Payment verification</h4>
                      <p className="text-gray-700 text-xs">Driver Settlement, Paystub, Invoice, 1099.</p>
                    </div>

                    {/* Merchant Processing Statement */}
                    <div className="p-4 border border-gray-300 rounded-2xl bg-gray-100">
                      <FileCheckIcon className="w-6 h-6 mb-3 text-green-600" />
                      <h4 className="font-bold text-gray-900 text-sm mb-1 font-serif">Merchant Processing Statement</h4>
                      <p className="text-gray-700 text-xs">Clover, Square, Stripe, QuickBooks, et.</p>
                    </div>
                  </div>

                  {/* Central Drag and Drop Zone - Below Cards */}
                  <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all cursor-pointer ${
                      isDropzoneActive
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-300 bg-gray-50 hover:border-gray-400'
                    }`}
                  >
                    <input {...getInputProps()} />
                    <Upload className={`w-8 h-8 mx-auto mb-2 ${isDropzoneActive ? 'text-blue-500' : 'text-gray-400'}`} />
                    <p className={`text-sm font-medium ${isDropzoneActive ? 'text-blue-600' : 'text-gray-700'}`}>
                      {isDropzoneActive
                        ? 'Drop your files here'
                        : 'Drag and drop files here or click to select'}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">Max 2MB per file • Max 10 files • {uploadedFiles.length}/10 uploaded</p>
                  </div>

                  {/* Validation Error Message */}
                  {validationError && (
                    <div className="p-3 bg-red-50 border border-red-300 rounded-lg">
                      <p className="text-sm text-red-700 font-sans font-normal">{validationError}</p>
                    </div>
                  )}

                  {/* Uploaded Files Display */}
                  {uploadedFiles.length > 0 && (
                    <div className="space-y-2">
                      {uploadedFiles.map((file) => (
                        <div key={file.id} className="flex items-center gap-3 p-3 bg-gray-100 rounded-2xl border border-green-600">
                          <div className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0 bg-transparent">
                            <FileCheckIcon className="w-5 h-5 text-green-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-gray-900 font-sans text-sm font-normal">{file.name}</p>
                            <p className="text-xs text-gray-600">{file.size} MB</p>
                          </div>
                          <button
                            onClick={() => handleDownloadFile(file)}
                            className="text-gray-500 hover:text-gray-700"
                            title="Download file"
                          >
                            <Download className="w-5 h-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Upload Button */}
                  <button 
                    onClick={handleUploadSupportingDocs} 
                    disabled={uploadedFiles.length === 0}
                    className={`w-full py-3 text-white font-medium rounded-lg flex items-center justify-center gap-2 transition-colors ${uploadedFiles.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                  >
                    Upload
                    <span>→</span>
                  </button>
                </div>
              )}
            </div>

            {/* Industry Details - Expandable */}
            <div className={`border rounded-2xl overflow-visible transition-all ${isIndustryComplete ? 'border-gray-200 bg-white' : expandedAccordion === 'industry' ? 'border-blue-300 bg-blue-50' : 'border-gray-200 bg-white'}`}>
              <button
                onClick={() => toggleAccordion('industry')}
                className={`w-full p-4 flex items-center gap-3 transition-colors ${expandedAccordion === 'industry' ? 'hover:bg-blue-100' : 'hover:bg-gray-50'}`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${isIndustryComplete ? 'bg-green-500' : 'bg-slate-300'}`}>
                  {isIndustryComplete ? (
                    <Check className="w-4 h-4 text-white" />
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  )}
                </div>
                <span className="text-gray-900 font-medium flex-1 text-left flex items-center gap-2">
                  Industry Details
                  <span className="px-2 py-1 bg-gray-200 text-gray-700 text-xs font-medium rounded-full">Optional</span>
                </span>
                <ChevronDown className={`w-5 h-5 ${isIndustryComplete ? 'text-gray-400' : 'text-blue-500'} transition-transform ${expandedAccordion === 'industry' ? 'rotate-180' : ''}`} />
              </button>

              {expandedAccordion === 'industry' && (
                <div className="px-4 pb-4 bg-white rounded-b-xl pt-3 rounded-xl space-y-7">
                  {/* How did you hear about us */}
                  <div ref={hearAboutUsRef} className="relative space-y-2">
                    <label className="text-sm font-medium text-gray-800 block">How did you hear about us?</label>
                    <button
                      type="button"
                      onClick={() => setShowHearAboutUsDropdown(!showHearAboutUsDropdown)}
                      className="w-full px-4 py-2 border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md bg-white text-gray-900 text-left flex items-center justify-between pr-2.5"
                    >
                      <span>{formData.hearAboutUs || 'Select an option'}</span>
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    </button>
                    {showHearAboutUsDropdown && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-blue-950 rounded-md shadow-lg z-50 max-h-48 overflow-y-auto">
                        <ul className="divide-y divide-blue-900">
                          {hearAboutUsOptions.map((option, index) => (
                            <li key={option}>
                              <button
                                type="button"
                                onClick={() => {
                                  handleInputChange('hearAboutUs', option)
                                  setShowHearAboutUsDropdown(false)
                                }}
                                onMouseEnter={() => setHearAboutUsHighlighted(index)}
                                className={`w-full px-6 py-3 text-left text-sm font-sans transition-colors ${
                                  index === hearAboutUsHighlighted
                                    ? 'bg-blue-900'
                                    : 'bg-blue-950 hover:bg-blue-900'
                                } ${
                                  formData.hearAboutUs === option
                                    ? 'text-blue-200 font-semibold'
                                    : 'text-white'
                                }`}
                              >
                                {option}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* EIN Input */}
                  <div>
                    <label className="text-sm font-medium text-gray-800 block mb-2">EIN (Employer Identification Number)</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="xx-xxxxxxx"
                        value={formData.ein}
                        onChange={(e) => handleInputChange('ein', e.target.value)}
                        maxLength="10"
                        className={`w-full px-4 py-2 border text-sm focus:outline-none focus:ring-2 rounded-md pr-10 ${
                          einError ? 'border-red-400 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                        }`}
                      />
                    </div>
                    {einError && (
                      <p className="text-red-600 text-xs mt-1">{einError}</p>
                    )}
                  </div>

                  {/* Industry Type */}
                  <div ref={industryRef} className="relative space-y-2">
                    <label className="text-sm font-medium text-gray-800 block">Industry Type</label>
                    <button
                      type="button"
                      onClick={() => setShowIndustryDropdown(!showIndustryDropdown)}
                      className="w-full px-4 py-2 border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md bg-white text-gray-900 text-left flex items-center justify-between"
                    >
                      <span>{formData.industryType ? industryOptions[industryOptions.indexOf(Object.keys(industrySubtypes).find(key => key === formData.industryType) || formData.industryType)] || formData.industryType : 'Select an industry'}</span>
                      <ChevronDown className="w-4 h-4 text-gray-500 mr-2" />
                    </button>
                    {showIndustryDropdown && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-blue-950 rounded-md shadow-lg z-50 max-h-80 overflow-y-auto">
                        <ul className="divide-y divide-blue-900">
                          {industryOptions.map((option, index) => (
                            <li key={option}>
                              <button
                                type="button"
                                onClick={() => {
                                  // Map display name to key
                                  const keyMap: Record<string, string> = {
                                    'Child and Elder Care': 'child-elder-care',
                                    'Construction / Trades': 'construction-trades',
                                    'Food & Beverage': 'food-beverage',
                                    'Healthcare': 'healthcare',
                                    'Professional Services': 'professional-services',
                                    'Retail / E-Commerce': 'retail-ecommerce',
                                    'Transportation / Logistics': 'transportation-logistics',
                                    'Technology': 'technology',
                                    'Beauty / Personal Care': 'beauty-personal-care',
                                    'Education / Tutoring': 'education-tutoring',
                                    'Other': 'other'
                                  }
                                  handleInputChange('industryType', keyMap[option] || option)
                                  handleInputChange('industrySubtype', '')
                                  setShowIndustryDropdown(false)
                                }}
                                onMouseEnter={() => setIndustryHighlighted(index)}
                                className={`w-full px-6 py-3 text-left text-sm font-sans transition-colors ${
                                  index === industryHighlighted
                                    ? 'bg-blue-900'
                                    : 'bg-blue-950 hover:bg-blue-900'
                                } ${
                                  formData.industryType === option || (formData.industryType && option.includes(formData.industryType))
                                    ? 'text-blue-200 font-semibold'
                                    : 'text-white'
                                }`}
                              >
                                {option}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Industry Sub-Type */}
                  {formData.industryType && formData.industryType !== 'other' && (
                    <div ref={subIndustryRef} className="relative space-y-2">
                      <label className="text-sm font-medium text-gray-800 block">Sub-Industry</label>
                      <button
                        type="button"
                        onClick={() => setShowSubIndustryDropdown(!showSubIndustryDropdown)}
                        className="w-full px-4 py-2 border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md bg-white text-gray-900 text-left flex items-center justify-between"
                      >
                        <span>{formData.industrySubtype || 'Select a sub-industry'}</span>
                        <ChevronDown className="w-4 h-4 text-gray-500 mr-2" />
                      </button>
                      {showSubIndustryDropdown && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-blue-950 rounded-md shadow-lg z-50 max-h-80 overflow-y-auto">
                          <ul className="divide-y divide-blue-900">
                            {industrySubtypes[formData.industryType]?.map((option, index) => (
                              option !== 'Select a sub-industry' && (
                                <li key={option}>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      handleInputChange('industrySubtype', option)
                                      setShowSubIndustryDropdown(false)
                                    }}
                                    onMouseEnter={() => setSubIndustryHighlighted(index)}
                                    className={`w-full px-6 py-3 text-left text-sm font-sans transition-colors ${
                                      index === subIndustryHighlighted
                                        ? 'bg-blue-900'
                                        : 'bg-blue-950 hover:bg-blue-900'
                                    } ${
                                      formData.industrySubtype === option
                                        ? 'text-blue-200 font-semibold'
                                        : 'text-white'
                                    }`}
                                  >
                                    {option}
                                  </button>
                                </li>
                              )
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Save Button */}
                  <button 
                    onClick={handleSaveIndustryDetails} 
                    disabled={!isIndustryDetailsValid() || isSavingIndustry}
                    className={`w-full py-3 font-medium rounded-lg transition-colors flex items-center justify-center gap-2 ${
                      !isIndustryDetailsValid() || isSavingIndustry
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-blue-900 text-white hover:bg-blue-800'
                    }`}
                  >
                    Save
                    {isSavingIndustry ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <span>→</span>
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* References - Expandable */}
            <div className={`border rounded-2xl overflow-hidden transition-all ${isReferencesComplete ? 'border-gray-200 bg-white' : expandedAccordion === 'references' ? 'border-blue-300 bg-blue-50' : 'border-gray-200 bg-white'}`}>
              <button
                onClick={() => toggleAccordion('references')}
                className={`w-full p-4 flex items-center gap-3 transition-colors ${expandedAccordion === 'references' ? 'hover:bg-blue-100' : 'hover:bg-gray-50'}`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${isReferencesComplete ? 'bg-green-500' : 'bg-slate-300'}`}>
                  {isReferencesComplete ? (
                    <Check className="w-4 h-4 text-white" />
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  )}
                </div>
                <span className="text-gray-900 font-medium flex-1 text-left flex items-center gap-2">
                  Support References
                  <span className="px-2 py-1 bg-gray-200 text-gray-700 text-xs font-medium rounded-full">Optional</span>
                </span>
                <ChevronDown className={`w-5 h-5 ${isReferencesComplete ? 'text-gray-400' : 'text-blue-500'} transition-transform ${expandedAccordion === 'references' ? 'rotate-180' : ''}`} />
              </button>

              {expandedAccordion === 'references' && (
                <div className="px-4 pb-4 space-y-6 bg-white rounded-b-xl pt-3 rounded-xl">
                  {/* Business Contact Section */}
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1 text-base">Business Contact</h4>
                      <p className="text-gray-600 text-sm">A trusted contact we can reach if needed.</p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-800 block mb-2">Company Name</label>
                      <input
                        type="text"
                        placeholder="e.g. ABC Plumbing"
                        value={formData.businessCompanyName}
                        onChange={(e) => handleInputChange('businessCompanyName', e.target.value)}
                        className={`w-full px-4 py-2 border text-sm focus:outline-none focus:ring-2 rounded-md ${
                          referencesErrors.businessCompanyName ? 'border-red-400 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                        }`}
                      />
                      {referencesErrors.businessCompanyName && (
                        <p className="text-red-600 text-xs mt-1">{referencesErrors.businessCompanyName}</p>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-800 block mb-2">Contact Name</label>
                      <input
                        type="text"
                        placeholder="Enter contact name"
                        value={formData.businessContactName}
                        onChange={(e) => handleInputChange('businessContactName', e.target.value)}
                        className={`w-full px-4 py-2 border text-sm focus:outline-none focus:ring-2 rounded-md ${
                          referencesErrors.businessContactName ? 'border-red-400 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                        }`}
                      />
                      {referencesErrors.businessContactName && (
                        <p className="text-red-600 text-xs mt-1">{referencesErrors.businessContactName}</p>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-800 block mb-2">Contact Phone</label>
                      <input
                        type="tel"
                        placeholder="555-456-6789"
                        value={formData.businessContactPhone}
                        onChange={(e) => handleInputChange('businessContactPhone', e.target.value)}
                        className={`w-full px-4 py-2 border text-sm focus:outline-none focus:ring-2 rounded-md ${
                          referencesErrors.businessContactPhone ? 'border-red-400 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                        }`}
                      />
                      {referencesErrors.businessContactPhone && (
                        <p className="text-red-600 text-xs mt-1">{referencesErrors.businessContactPhone}</p>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-800 block mb-2">Relationship</label>
                      <input
                        type="text"
                        placeholder="e.g. Manager, Owner"
                        value={formData.businessRelationship}
                        onChange={(e) => handleInputChange('businessRelationship', e.target.value)}
                        className={`w-full px-4 py-2 border text-sm focus:outline-none focus:ring-2 rounded-md ${
                          referencesErrors.businessRelationship ? 'border-red-400 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                        }`}
                      />
                      {referencesErrors.businessRelationship && (
                        <p className="text-red-600 text-xs mt-1">{referencesErrors.businessRelationship}</p>
                      )}
                    </div>
                  </div>

                  {/* Personal Contact Section */}
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1 text-base">Personal Contact</h4>
                      <p className="text-gray-600 text-sm">A backup contact if we can't reach you.</p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-800 block mb-2">Contact Name</label>
                      <input
                        type="text"
                        placeholder="Enter contact name"
                        value={formData.personalContactName}
                        onChange={(e) => handleInputChange('personalContactName', e.target.value)}
                        className={`w-full px-4 py-2 border text-sm focus:outline-none focus:ring-2 rounded-md ${
                          referencesErrors.personalContactName ? 'border-red-400 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                        }`}
                      />
                      {referencesErrors.personalContactName && (
                        <p className="text-red-600 text-xs mt-1">{referencesErrors.personalContactName}</p>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-800 block mb-2">Contact Phone</label>
                      <input
                        type="tel"
                        placeholder="555-456-6789"
                        value={formData.personalContactPhone}
                        onChange={(e) => handleInputChange('personalContactPhone', e.target.value)}
                        className={`w-full px-4 py-2 border text-sm focus:outline-none focus:ring-2 rounded-md ${
                          referencesErrors.personalContactPhone ? 'border-red-400 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                        }`}
                      />
                      {referencesErrors.personalContactPhone && (
                        <p className="text-red-600 text-xs mt-1">{referencesErrors.personalContactPhone}</p>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-800 block mb-2">Relationship</label>
                      <input
                        type="text"
                        placeholder="e.g. Friend, Family"
                        value={formData.personalRelationship}
                        onChange={(e) => handleInputChange('personalRelationship', e.target.value)}
                        className={`w-full px-4 py-2 border text-sm focus:outline-none focus:ring-2 rounded-md ${
                          referencesErrors.personalRelationship ? 'border-red-400 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                        }`}
                      />
                      {referencesErrors.personalRelationship && (
                        <p className="text-red-600 text-xs mt-1">{referencesErrors.personalRelationship}</p>
                      )}
                    </div>
                  </div>

                  {/* Save Button */}
                  <button 
                    onClick={handleUpload} 
                    disabled={
                      referencesErrors.businessCompanyName ||
                      referencesErrors.businessContactName ||
                      referencesErrors.businessContactPhone ||
                      referencesErrors.businessRelationship ||
                      referencesErrors.personalContactName ||
                      referencesErrors.personalContactPhone ||
                      referencesErrors.personalRelationship ||
                      !formData.businessCompanyName.trim() ||
                      !formData.businessContactName.trim() ||
                      !formData.businessContactPhone.trim() ||
                      !formData.businessRelationship.trim() ||
                      !formData.personalContactName.trim() ||
                      !formData.personalContactPhone.trim() ||
                      !formData.personalRelationship.trim()
                    }
                    className={`w-full py-3 font-medium rounded-lg transition-colors flex items-center justify-center gap-2 ${
                      referencesErrors.businessCompanyName ||
                      referencesErrors.businessContactName ||
                      referencesErrors.businessContactPhone ||
                      referencesErrors.businessRelationship ||
                      referencesErrors.personalContactName ||
                      referencesErrors.personalContactPhone ||
                      referencesErrors.personalRelationship ||
                      !formData.businessCompanyName.trim() ||
                      !formData.businessContactName.trim() ||
                      !formData.businessContactPhone.trim() ||
                      !formData.businessRelationship.trim() ||
                      !formData.personalContactName.trim() ||
                      !formData.personalContactPhone.trim() ||
                      !formData.personalRelationship.trim()
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-blue-900 text-white hover:bg-blue-800'
                    }`}
                  >
                    Save
                    <span>→</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Continue Button */}
          <CTAButton onClick={handleContinue} disabled={isSubmitting}>
            Go to dashboard
          </CTAButton>
        </div>
      </main>
    </div>
  )
}
