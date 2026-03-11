const NewsletterBox = () => {

    const onSubmitHandler = (event) => {
        event.preventDefault();
        // এখানে আপনার API Call বা Firebase লজিক বসবে
        console.log("Email subscribed successfully!");
    }

    return (
        <div className='text-center px-4'>
            <p className='text-2xl font-semibold text-gray-800'>Subscribe now & get 25% off</p>
            <p className='text-gray-500 mt-3 max-w-lg mx-auto'>
                Join our newsletter today to stay updated with the latest fashion trends, 
                exclusive product drops, and special members-only offers.
            </p>
            <form onSubmit={onSubmitHandler} className='w-full sm:w-[450px] flex items-center gap-3 mx-auto my-6 border pl-3 rounded-sm shadow-sm'>
                <input 
                    className='w-full sm:flex-1 outline-none text-sm' 
                    type="email" 
                    placeholder='Enter your email address' 
                    required
                />
                <button 
                    type='submit' 
                    className='bg-black text-white text-xs px-10 py-4 hover:bg-gray-800 transition duration-300'
                >
                    SUBSCRIBE
                </button>
            </form>
        </div>
    )
}

export default NewsletterBox