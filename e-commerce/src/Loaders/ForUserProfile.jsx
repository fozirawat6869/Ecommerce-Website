function UserProfileSkeleton() {
  return (
    <div className="bg-gray-100 p-5 flex flex-col md:flex-row gap-10 animate-pulse">

      {/* LEFT SIDE */}
      <div className="w-full md:w-[35%] flex flex-col gap-5 bg-white p-5 rounded-lg shadow-md">
        
        <div className="flex gap-5 items-center">
          <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
          <div className="flex flex-col gap-2 w-full">
            <div className="h-4 bg-gray-300 rounded w-1/3"></div>
            <div className="h-5 bg-gray-300 rounded w-2/3"></div>
          </div>
        </div>

        <div className="h-10 bg-gray-300 rounded w-full"></div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full md:w-[65%] bg-white p-6 shadow-md rounded-lg flex flex-col gap-6">

        {/* PERSONAL INFO */}
        <div className="flex flex-col gap-4">
          <div className="h-5 bg-gray-300 rounded w-1/3"></div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="h-10 bg-gray-300 rounded w-full"></div>
            <div className="h-10 bg-gray-300 rounded w-full"></div>
          </div>
        </div>

        {/* EMAIL */}
        <div className="flex flex-col gap-4">
          <div className="h-5 bg-gray-300 rounded w-1/4"></div>
          <div className="h-10 bg-gray-300 rounded w-full md:w-[60%]"></div>
        </div>

        {/* MOBILE */}
        <div className="flex flex-col gap-4">
          <div className="h-5 bg-gray-300 rounded w-1/4"></div>
          <div className="h-10 bg-gray-300 rounded w-full md:w-[60%]"></div>
        </div>

      </div>
    </div>
  );
}

export default UserProfileSkeleton;