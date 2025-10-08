// app/how-it-works/page.tsx
"use client";

import Link from "next/link";

export default function Docs() {
  return (
    <main className="max-w-5xl mx-auto p-6 md:p-12 space-y-12">
      <h1 className="text-4xl font-bold text-gray-900">🔒 How It Works</h1>
      <p className="text-gray-700">
        Welcome to <strong>SecureVault</strong> — your personal, privacy-first password manager.
        This guide walks you through how to use the app efficiently and securely.
      </p>

      {/* Getting Started */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">🚀 Getting Started</h2>
        <p className="text-gray-700">
          When you first visit SecureVault, you’ll see three key sections on the home page:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li><strong>Password Generator</strong></li>
          <li><strong>How It Works</strong></li>
          <li><strong>Login / Signup</strong></li>
        </ul>
        <p className="text-gray-700">
          You can immediately start generating passwords without creating an account — but to <strong>save</strong> and <strong>manage</strong> them securely, you’ll need to <strong>sign up or log in</strong>.
        </p>
      </section>

      {/* Generating Passwords */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">🧩 Generating Passwords</h2>
        <p className="text-gray-700">
          Our password generator allows you to create strong, customizable passwords with just a few clicks.
        </p>
        <h3 className="text-xl font-semibold text-gray-800">Features:</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li><strong>Adjustable Length:</strong> Choose your preferred password length.</li>
          <li><strong>Include Numbers & Symbols:</strong> Add numbers and special characters for extra strength.</li>
          <li><strong>Instant Copy:</strong> Copy your generated password directly to your clipboard.</li>
        </ul>
        <p className="text-gray-700">
          You can use the generator freely, even without logging in — ideal for quick password creation.
        </p>
      </section>

      {/* Saving Passwords */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">💾 Saving Passwords</h2>
        <p className="text-gray-700">
          To <strong>save</strong> a password for later use, you need to be logged in. There are two saving options:
        </p>

        <h3 className="text-xl font-semibold text-gray-800">1. Save Without Details</h3>
        <p className="text-gray-700">
          Quickly store your generated password with one click — no extra input required.
        </p>

        <h3 className="text-xl font-semibold text-gray-800">2. Save With Details</h3>
        <p className="text-gray-700">Add more information to your entry, such as:</p>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Website URL</li>
          <li>Username (optional)</li>
          <li>Notes (optional)</li>
        </ul>
        <p className="text-gray-700">
          This helps you easily identify where each password belongs.
        </p>
      </section>

      {/* Managing Vault */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">👤 Managing Your Vault</h2>
        <p className="text-gray-700">
          Once logged in, go to your <strong>Profile</strong> section to manage all your stored passwords. You can:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>View your saved passwords</li>
          <li>Add or edit details</li>
          <li>Delete entries you no longer need</li>
        </ul>
        <p className="text-gray-700">
          All your stored information is encrypted to ensure your privacy and data safety.
        </p>
      </section>

      {/* Data Security */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">🔐 Data Security</h2>
        <p className="text-gray-700">
          Your security is our top priority. Every password and related detail you save is <strong>encrypted</strong> before being stored. Even if someone gains access to the database, your data remains unreadable without your unique encryption key.
        </p>
      </section>

      {/* Summary */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">🧭 Summary</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2 text-left">Action</th>
                <th className="border px-4 py-2 text-left">Login Required</th>
                <th className="border px-4 py-2 text-left">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white">
                <td className="border px-4 py-2">Generate Password</td>
                <td className="border px-4 py-2">❌</td>
                <td className="border px-4 py-2">Instantly create a secure password.</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border px-4 py-2">Save Password</td>
                <td className="border px-4 py-2">✅</td>
                <td className="border px-4 py-2">Store generated password securely.</td>
              </tr>
              <tr className="bg-white">
                <td className="border px-4 py-2">Save With Details</td>
                <td className="border px-4 py-2">✅</td>
                <td className="border px-4 py-2">Save with URL and notes for better organization.</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border px-4 py-2">Manage Saved Passwords</td>
                <td className="border px-4 py-2">✅</td>
                <td className="border px-4 py-2">Access, edit, or delete stored passwords.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Tips */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">💡 Tips for Best Use</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Always use <strong>symbols and numbers</strong> for a stronger password.</li>
          <li>Keep your <strong>encryption key</strong> and account credentials private.</li>
          <li>Regularly review and update your saved passwords.</li>
        </ul>
      </section>

      {/* Closing */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">🌐 Start Securing Your Digital Life</h2>
        <p className="text-gray-700">
          Whether you’re here to create a one-time password or manage dozens securely — SecureVault has you covered.
          Your data, your control, <strong>100% encrypted</strong>.
        </p>
        <Link
          href="/"
          className="inline-block mt-4 px-6 py-3 bg-black text-white font-semibold rounded hover:bg-gray-800 transition"
        >
          ➡ Go to Password Generator
        </Link>
      </section>
    </main>
  );
}
