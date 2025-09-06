"use client";

// import { useEffect } from "react";
import Link from "next/link";
import {
  CheckIcon,
  ClockIcon,
  StarIcon,
  VinylIcon,
  StairsIcon,
  BaseboardIcon,
  CustomIcon,
} from "../../components/icons";
// import GoogleSignIn from "../../components/GoogleSignIn";
import BookingForm from "../../components/BookingForm";
import BookingSteps from "../../components/BookingSteps";
// import { useAuth } from "../../contexts/AuthContext";

export default function BookingsPage() {
  // const { isAuthenticated, user, checkAuth, isLoading } = useAuth();

  // useEffect(() => {
  //   // Check if we're returning from OAuth
  //   const urlParams = new URLSearchParams(window.location.search);
  //   const hasAuthParams = urlParams.has("code") || urlParams.has("error");

  //   if (hasAuthParams) {
  //     // Wait a bit for backend to process OAuth callback
  //     setTimeout(async () => {
  //       await checkAuth();
  //     }, 1500);
  //   }
  // }, [checkAuth]);

  // // Show loading while checking authentication
  // if (isLoading) {
  //   return (
  //     <div className="min-h-screen bg-gray-50 flex items-center justify-center">
  //       <div className="text-center">
  //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
  //         <p className="mt-4 text-gray-600">Loading...</p>
  //       </div>
  //     </div>
  //   );
  // }

  // If not authenticated, show login required message
  // if (!isAuthenticated) {
  //   return (
  //     <div className="max-w-[2000px] min-h-screen bg-gray-50">
  //       {/* Hero Section */}
  //       <section className="w-full bg-blue-700 bg-gradient-to-br from-blue-600 to-blue-700 py-20">
  //         <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
  //           <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 inter-tight-bold">
  //             Sign In Required
  //           </h1>
  //           <p className="text-xl text-blue-100 mb-8 inter-tight-medium">
  //             Please sign in to schedule your free flooring estimate
  //           </p>
  //         </div>
  //       </section>

  //       {/* Login Section */}
  //       <section className="py-16 bg-white">
  //         <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
  //           <div className="bg-white rounded-lg shadow-xl p-8">
  //             <div className="text-center mb-8">
  //               <h2 className="text-2xl font-bold text-gray-900 mb-4 inter-tight-bold">
  //                 Sign In to Continue
  //               </h2>
  //               <p className="text-gray-600 inter-tight-regular">
  //                 You need to be signed in to schedule your free flooring
  //                 estimate. This helps us provide you with the best service and
  //                 track your requests.
  //               </p>
  //             </div>

  //             <div className="space-y-6">
  //               <GoogleSignIn>
  //                 <div className="flex items-center justify-center">
  //                   <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
  //                     <path
  //                       fill="currentColor"
  //                       d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
  //                     />
  //                     <path
  //                       fill="currentColor"
  //                       d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
  //                     />
  //                     <path
  //                       fill="currentColor"
  //                       d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
  //                     />
  //                     <path
  //                       fill="currentColor"
  //                       d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
  //                     />
  //                   </svg>
  //                   Sign in with Google to Continue
  //                 </div>
  //               </GoogleSignIn>

  //               <div className="text-center">
  //                 <p className="text-sm text-gray-500 inter-tight-regular">
  //                   By signing in, you agree to our{" "}
  //                   <Link
  //                     href="/terms"
  //                     className="text-blue-600 hover:text-blue-800 underline"
  //                   >
  //                     terms of service
  //                   </Link>{" "}
  //                   and{" "}
  //                   <Link
  //                     href="/privacy"
  //                     className="text-blue-600 hover:text-blue-800 underline"
  //                   >
  //                     privacy policy
  //                   </Link>
  //                 </p>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </section>

  //       {/* Why Sign In Section */}
  //       <section className="py-16 bg-gray-50">
  //         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
  //           <div className="text-center mb-12">
  //             <h2 className="text-3xl font-bold text-gray-900 mb-4 inter-tight-bold">
  //               Why Sign In to Book an Estimate?
  //             </h2>
  //             <p className="text-lg text-gray-600 inter-tight-medium">
  //               We require authentication to provide you with the best service
  //               experience
  //             </p>
  //           </div>

  //           <div className="grid md:grid-cols-3 gap-8">
  //             <div className="text-center">
  //               <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
  //                 <svg
  //                   className="w-8 h-8 text-blue-600"
  //                   fill="none"
  //                   stroke="currentColor"
  //                   viewBox="0 0 24 24"
  //                 >
  //                   <path
  //                     strokeLinecap="round"
  //                     strokeLinejoin="round"
  //                     strokeWidth={2}
  //                     d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
  //                   />
  //                 </svg>
  //               </div>
  //               <h3 className="text-xl font-semibold text-gray-900 mb-2 inter-tight-semibold">
  //                 Track Your Requests
  //               </h3>
  //               <p className="text-gray-600 inter-tight-regular">
  //                 Keep track of your estimate requests and project status
  //               </p>
  //             </div>

  //             <div className="text-center">
  //               <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
  //                 <svg
  //                   className="w-8 h-8 text-blue-600"
  //                   fill="none"
  //                   stroke="currentColor"
  //                   viewBox="0 0 24 24"
  //                 >
  //                   <path
  //                     strokeLinecap="round"
  //                     strokeLinejoin="round"
  //                     strokeWidth={2}
  //                     d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
  //                   />
  //                 </svg>
  //               </div>
  //               <h3 className="text-xl font-semibold text-gray-900 mb-2 inter-tight-semibold">
  //                 Secure & Private
  //               </h3>
  //               <p className="text-gray-600 inter-tight-regular">
  //                 Your information is kept secure and private
  //               </p>
  //             </div>

  //             <div className="text-center">
  //               <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
  //                 <svg
  //                   className="w-8 h-8 text-blue-600"
  //                   fill="none"
  //                   stroke="currentColor"
  //                   viewBox="0 0 24 24"
  //                 >
  //                   <path
  //                     strokeLinecap="round"
  //                     strokeLinejoin="round"
  //                     strokeWidth={2}
  //                     d="M13 10V3L4 14h7v7l9-11h-7z"
  //                   />
  //                 </svg>
  //               </div>
  //               <h3 className="text-xl font-semibold text-gray-900 mb-2 inter-tight-semibold">
  //                 Faster Service
  //               </h3>
  //               <p className="text-gray-600 inter-tight-regular">
  //                 Get faster responses and better communication
  //               </p>
  //             </div>
  //           </div>
  //         </div>
  //       </section>

  //       {/* Service Areas */}
  //       <section className="py-16 bg-white">
  //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  //           <div className="text-center mb-12">
  //             <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 inter-tight-bold">
  //               Top Services We Offer
  //             </h2>
  //             <p className="text-lg text-gray-600 inter-tight-medium">
  //               Professional flooring solutions tailored to your needs
  //             </p>
  //           </div>

  //           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
  //             {/* Luxury Vinyl - Popular Choice */}
  //             <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border-2 border-blue-200 relative">
  //               <div className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
  //                 POPULAR
  //               </div>
  //               <div className="flex items-center mb-4">
  //                 <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
  //                   <VinylIcon
  //                     className="w-6 h-6 text-white"
  //                     fill="currentColor"
  //                   />
  //                 </div>
  //                 <h3 className="text-lg font-bold text-gray-900 inter-tight-bold">
  //                   Luxury Vinyl
  //                 </h3>
  //               </div>
  //               <p className="text-gray-700 inter-tight-regular">
  //                 Professional installation of durable, waterproof luxury vinyl
  //                 flooring.
  //               </p>
  //             </div>

  //             {/* Stairs */}
  //             <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
  //               <div className="flex items-center mb-4">
  //                 <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mr-4">
  //                   <StairsIcon
  //                     className="w-6 h-6 text-white"
  //                     fill="currentColor"
  //                   />
  //                 </div>
  //                 <h3 className="text-lg font-bold text-gray-900 inter-tight-bold">
  //                   Stair Renovation
  //                 </h3>
  //               </div>
  //               <p className="text-gray-700 inter-tight-regular">
  //                 Complete stair renovation and installation services.
  //               </p>
  //             </div>

  //             {/* Baseboard */}
  //             <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border-2 border-blue-200 relative">
  //               <div className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
  //                 POPULAR
  //               </div>
  //               <div className="flex items-center mb-4">
  //                 <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
  //                   <BaseboardIcon
  //                     className="w-6 h-6 text-white"
  //                     fill="currentColor"
  //                   />
  //                 </div>
  //                 <h3 className="text-lg font-bold text-gray-900 inter-tight-bold">
  //                   Baseboard Work
  //                 </h3>
  //               </div>
  //               <p className="text-gray-700 inter-tight-regular">
  //                 Professional baseboard repairs and installation.
  //               </p>
  //             </div>

  //             {/* Custom Solutions */}
  //             <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
  //               <div className="flex items-center mb-4">
  //                 <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mr-4">
  //                   <CustomIcon
  //                     className="w-6 h-6 text-white"
  //                     fill="currentColor"
  //                   />
  //                 </div>
  //                 <h3 className="text-lg font-bold text-gray-900 inter-tight-bold">
  //                   Custom Solutions
  //                 </h3>
  //               </div>
  //               <p className="text-gray-700 inter-tight-regular">
  //                 Tailored flooring solutions for unique spaces and
  //                 requirements.
  //               </p>
  //             </div>
  //           </div>
  //         </div>
  //       </section>

  //       {/* Why Choose Us Block */}
  //       <section className="py-12 bg-[#222222]">
  //         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
  //           <div className="p-8 ">
  //             <h3 className="text-2xl font-bold text-white mb-6 text-center inter-tight-bold">
  //               Why Choose Us?
  //             </h3>
  //             <div className="grid md:grid-cols-3 gap-6">
  //               <div className="text-center">
  //                 <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
  //                   <ClockIcon
  //                     className="w-6 h-6 text-blue-600"
  //                     fill="currentColor"
  //                   />
  //                 </div>
  //                 <div className="text-2xl font-bold text-blue-600 inter-tight-bold mb-1">
  //                   15+
  //                 </div>
  //                 <div className="text-sm text-white inter-tight-medium">
  //                   Years Experience
  //                 </div>
  //               </div>

  //               <div className="text-center">
  //                 <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
  //                   <StarIcon
  //                     className="w-6 h-6 text-yellow-500"
  //                     fill="currentColor"
  //                   />
  //                 </div>
  //                 <div className="text-2xl font-bold text-yellow-600 inter-tight-bold mb-1">
  //                   4.9/5
  //                 </div>
  //                 <div className="text-sm text-white inter-tight-medium">
  //                   Customer Rating
  //                 </div>
  //               </div>

  //               <div className="text-center">
  //                 <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
  //                   <CheckIcon
  //                     className="w-6 h-6 text-green-600"
  //                     fill="currentColor"
  //                   />
  //                 </div>
  //                 <div className="text-2xl font-bold text-green-600 inter-tight-bold mb-1">
  //                   800+
  //                 </div>
  //                 <div className="text-sm text-white inter-tight-medium">
  //                   Happy Customers
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </section>

  //       {/* Why Choose Us Section */}
  //       <section className="py-16 bg-white">
  //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  //           <div className="text-center mb-12">
  //             <h2 className="text-3xl font-bold text-gray-900 mb-4 inter-tight-bold">
  //               Why Choose Our Family-Owned Flooring Company?
  //             </h2>
  //             <p className="text-lg text-gray-600 inter-tight-medium">
  //               Professional flooring services with honest pricing and quality
  //               workmanship.
  //             </p>
  //           </div>

  //           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
  //             <div className="text-center">
  //               <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
  //                 <CheckIcon className="w-8 h-8 text-blue-600" />
  //               </div>
  //               <h3 className="text-xl font-semibold text-gray-900 mb-2 inter-tight-semibold">
  //                 Free Estimates
  //               </h3>
  //               <p className="text-gray-600 inter-tight-regular">
  //                 No obligation, honest pricing for all flooring services
  //               </p>
  //             </div>

  //             <div className="text-center">
  //               <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
  //                 <StarIcon
  //                   className="w-8 h-8 text-blue-600"
  //                   fill="currentColor"
  //                 />
  //               </div>
  //               <h3 className="text-xl font-semibold text-gray-900 mb-2 inter-tight-semibold">
  //                 4.9/5 Rating
  //               </h3>
  //               <p className="text-gray-600 inter-tight-regular">
  //                 800+ satisfied customers in OC, LAC, and the greater 626 area
  //               </p>
  //             </div>

  //             <div className="text-center">
  //               <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
  //                 <ClockIcon className="w-8 h-8 text-blue-600" />
  //               </div>
  //               <h3 className="text-xl font-semibold text-gray-900 mb-2 inter-tight-semibold">
  //                 15+ Years Experience
  //               </h3>
  //               <p className="text-gray-600 inter-tight-regular">
  //                 Family-owned business since 2009 serving the community
  //               </p>
  //             </div>

  //             <div className="text-center">
  //               <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
  //                 <CheckIcon className="w-8 h-8 text-blue-600" />
  //               </div>
  //               <h3 className="text-xl font-semibold text-gray-900 mb-2 inter-tight-semibold">
  //                 Specialized & Insured
  //               </h3>
  //               <p className="text-gray-600 inter-tight-regular">
  //                 A professional you can trust
  //               </p>
  //             </div>
  //           </div>
  //         </div>
  //       </section>

  //       {/* CTA Section */}
  //       <section className="py-16 bg-blue-600">
  //         <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
  //           <h2 className="text-3xl font-bold text-white mb-4 inter-tight-bold">
  //             Ready to Transform Your Floors?
  //           </h2>
  //           <p className="text-xl text-blue-100 mb-8 inter-tight-medium">
  //             Get your free estimate today from us. No Obligations. Professional
  //             floor installation, stair renovation, and flooring services in OC,
  //             LAC, and the greater 626 area.
  //           </p>
  //           <Link
  //             href="/"
  //             className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-lg text-lg transition-colors duration-200 text-center"
  //           >
  //             Back to Home
  //           </Link>
  //         </div>
  //       </section>
  //     </div>
  //   );
  // }

  // If authenticated, show the booking form
  return (
    <div className="max-w-[2000px] min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className=" bg-blue-600 py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 inter-tight-bold">
            Get Your Free Flooring Estimate
          </h1>
          <p className="text-xl text-blue-100 mb-8 inter-tight-medium">
            Welcome! Let&apos;s schedule your free flooring estimate.
          </p>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="flex items-center space-x-2">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="w-5 h-5" fill="currentColor" />
                ))}
              </div>
              <span className="text-white font-medium inter-tight-medium">
                4.9/5 (800+ reviews)
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <ClockIcon className="w-5 h-5 text-blue-200" />
              <span className="text-white font-medium inter-tight-medium">
                15+ Years Experience
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-4 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
          <div className="text-center md:mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 inter-tight-bold">
              Top Services We Offer
            </h2>
            <p className="text-lg text-gray-600 inter-tight-medium">
              Professional flooring solutions tailored to your needs
            </p>
          </div>

          {/* Desktop Grid - Hidden on mobile */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Luxury Vinyl - Popular Choice */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border-2 border-blue-200 relative">
              <div className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                POPULAR
              </div>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                  <VinylIcon
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                  />
                </div>
                <h3 className="text-lg font-bold text-gray-900 inter-tight-bold">
                  Luxury Vinyl
                </h3>
              </div>
              <p className="text-gray-700 inter-tight-regular">
                Professional installation of durable, waterproof luxury vinyl
                flooring.
              </p>
            </div>

            {/* Stairs */}
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mr-4">
                  <StairsIcon
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                  />
                </div>
                <h3 className="text-lg font-bold text-gray-900 inter-tight-bold">
                  Stair Renovation
                </h3>
              </div>
              <p className="text-gray-700 inter-tight-regular">
                Complete stair renovation and installation services.
              </p>
            </div>

            {/* Baseboard */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border-2 border-blue-200 relative">
              <div className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                POPULAR
              </div>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                  <BaseboardIcon
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                  />
                </div>
                <h3 className="text-lg font-bold text-gray-900 inter-tight-bold">
                  Baseboard Work
                </h3>
              </div>
              <p className="text-gray-700 inter-tight-regular">
                Professional baseboard repairs and installation.
              </p>
            </div>

            {/* Custom Solutions */}
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mr-4">
                  <CustomIcon
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                  />
                </div>
                <h3 className="text-lg font-bold text-gray-900 inter-tight-bold">
                  Custom Solutions
                </h3>
              </div>
              <p className="text-gray-700 inter-tight-regular">
                Tailored flooring solutions for unique spaces and requirements.
              </p>
            </div>
          </div>

          {/* Mobile Animated Carousel - Hidden on desktop */}
          <div className="md:hidden services-carousel relative h-64 flex items-center justify-center">
            {/* Luxury Vinyl - Popular Choice */}
            <div className="service-card absolute inset-0 flex flex-col items-center justify-center text-center px-4 opacity-0">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border-2 border-blue-200 relative max-w-sm w-full">
                <div className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                  POPULAR
                </div>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                    <VinylIcon
                      className="w-6 h-6 text-white"
                      fill="currentColor"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 inter-tight-bold">
                    Luxury Vinyl
                  </h3>
                </div>
                <p className="text-gray-700 inter-tight-regular">
                  Professional installation of durable, waterproof luxury vinyl
                  flooring.
                </p>
              </div>
            </div>

            {/* Stairs */}
            <div className="service-card absolute inset-0 flex flex-col items-center justify-center text-center px-4 opacity-0">
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 max-w-sm w-full">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mr-4">
                    <StairsIcon
                      className="w-6 h-6 text-white"
                      fill="currentColor"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 inter-tight-bold">
                    Stair Renovation
                  </h3>
                </div>
                <p className="text-gray-700 inter-tight-regular">
                  Complete stair renovation and installation services.
                </p>
              </div>
            </div>

            {/* Baseboard */}
            <div className="service-card absolute inset-0 flex flex-col items-center justify-center text-center px-4 opacity-0">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border-2 border-blue-200 relative max-w-sm w-full">
                <div className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                  POPULAR
                </div>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                    <BaseboardIcon
                      className="w-6 h-6 text-white"
                      fill="currentColor"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 inter-tight-bold">
                    Baseboard Work
                  </h3>
                </div>
                <p className="text-gray-700 inter-tight-regular">
                  Professional baseboard repairs and installation.
                </p>
              </div>
            </div>

            {/* Custom Solutions */}
            <div className="service-card absolute inset-0 flex flex-col items-center justify-center text-center px-4 opacity-0">
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 max-w-sm w-full">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mr-4">
                    <CustomIcon
                      className="w-6 h-6 text-white"
                      fill="currentColor"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 inter-tight-bold">
                    Custom Solutions
                  </h3>
                </div>
                <p className="text-gray-700 inter-tight-regular">
                  Tailored flooring solutions for unique spaces and
                  requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Steps Section */}
      <BookingSteps />

      {/* Booking Form Section */}
      <BookingForm />

      {/* Why Choose Us Block */}
      <section className="py-12 bg-[#222222]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 ">
            <h3 className="text-2xl font-bold text-white mb-6 text-center inter-tight-bold">
              Why Choose Us?
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <ClockIcon
                    className="w-6 h-6 text-blue-600"
                    fill="currentColor"
                  />
                </div>
                <div className="text-2xl font-bold text-blue-600 inter-tight-bold mb-1">
                  15+
                </div>
                <div className="text-sm text-white inter-tight-medium">
                  Years Experience
                </div>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <StarIcon
                    className="w-6 h-6 text-yellow-500"
                    fill="currentColor"
                  />
                </div>
                <div className="text-2xl font-bold text-yellow-600 inter-tight-bold mb-1">
                  4.9/5
                </div>
                <div className="text-sm text-white inter-tight-medium">
                  Customer Rating
                </div>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckIcon
                    className="w-6 h-6 text-green-600"
                    fill="currentColor"
                  />
                </div>
                <div className="text-2xl font-bold text-green-600 inter-tight-bold mb-1">
                  800+
                </div>
                <div className="text-sm text-white inter-tight-medium">
                  Happy Customers
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 inter-tight-bold">
              Why Choose Our Family-Owned Flooring Company?
            </h2>
            <p className="text-lg text-gray-600 inter-tight-medium">
              Professional flooring services with honest pricing and quality
              workmanship.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CheckIcon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 inter-tight-semibold">
                Free Estimates
              </h3>
              <p className="text-gray-600 inter-tight-regular">
                No obligation, honest pricing for all flooring services
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <StarIcon
                  className="w-8 h-8 text-blue-600"
                  fill="currentColor"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 inter-tight-semibold">
                4.9/5 Rating
              </h3>
              <p className="text-gray-600 inter-tight-regular">
                800+ satisfied customers in OC, LAC, and the greater 626 area
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <ClockIcon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 inter-tight-semibold">
                15+ Years Experience
              </h3>
              <p className="text-gray-600 inter-tight-regular">
                Family-owned business since 2009 serving the community
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CheckIcon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 inter-tight-semibold">
                Specialized & Insured
              </h3>
              <p className="text-gray-600 inter-tight-regular">
                A professional you can trust
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4 inter-tight-bold">
            Ready to Transform Your Floors?
          </h2>
          <p className="text-xl text-blue-100 mb-8 inter-tight-medium">
            Get your free estimate today from us. No Obligations. Professional
            floor installation, stair renovation, and flooring services in OC,
            LAC, and the greater 626 area.
          </p>
          <Link
            href="/"
            className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-lg text-lg transition-colors duration-200 text-center"
          >
            Back to Home
          </Link>
        </div>
      </section>
    </div>
  );
}
