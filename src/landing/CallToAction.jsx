import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import BookDemoModal from '../components/BookDemoModal';

export default function CallToAction() {
      const [bookDemoOpen, setBookDemoOpen] = useState(false);

      return (
              <div className="w-full">
                      <div className="dark:bg-gray-900 bg-gray-50 px-8 sm:px-12 py-10 text-center rounded-xl">
                              <h2 className="mx-auto max-w-4xl text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-blue-700 dark:from-blue-400 dark:to-blue-600 sm:text-4xl">
                                      Start building with Windmill
                              </h2>
                              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
                                      <a
                                              href="https://app.windmill.dev/user/login"
                                              onClick={() => window.plausible('try-cloud')}
                                              data-analytics='"try-cloud"'
                                              className="rounded-lg bg-blue-600 hover:bg-blue-700 px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors !no-underline"
                                              rel="nofollow"
                                      >
                                              Get started for free
                                      </a>
                                      <button
                                              onClick={() => setBookDemoOpen(true)}
                                              className="group flex items-center gap-2 text-base font-semibold text-gray-900 dark:text-white bg-transparent border-none cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                      >
                                              Contact us
                                              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                      </button>
                              </div>
                      </div>
                      <BookDemoModal open={bookDemoOpen} setOpen={setBookDemoOpen} />
              </div>
      );
}