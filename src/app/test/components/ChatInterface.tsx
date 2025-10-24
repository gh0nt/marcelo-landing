"use client";

import { useState } from "react";
import Image from "next/image";
import ImageModal from "./ImageModal";
import { Send, Copy, Check } from "lucide-react";

interface Message {
  id: number;
  sender: string;
  content: string;
  type: "text" | "image" | "code";
  imageUrl?: string;
  code?: {
    language: string;
    content: string;
  };
  timestamp: string;
}

const conversations: Message[] = [
  // Conversation 1: CSS Modifications
  {
    id: 1,
    sender: "Client",
    content:
      "TASK 1: Hello there!\n\nI need to make some modifications to my website https://tasksheet.tempurl.host/ and need your CSS skills. 🙂\n\nThere is a mockup I created for you, I guess it can help better than me describing every change. Please let me know how I can make those changes with CSS code.\n\nThank you.",
    type: "text",
    timestamp: "09:15 AM",
  },
  {
    id: 2,
    sender: "Marcelo",
    content:
      "Hello! It's Marcelo from WPMU DEV Tech Support. I hope my message finds you well.\n\nYes, let's start applying CSS changes. The approach depends on whether you're using a Theme Builder or default WordPress themes.",
    type: "text",
    timestamp: "09:18 AM",
  },
  {
    id: 3,
    sender: "Marcelo",
    content:
      "If using WordPress Default Themes:\n\nFirst, go to your WordPress Panel (yoururl.com/wp-admin) and enter your credentials.\n\nSecond, edit the CSS according to your workflow. If you use the WordPress CSS tool, follow these steps:\n\n• Locate the left sidebar and click on: Appearance → Customize → Custom CSS\n• Go to your browser and press Ctrl + Shift + C\n• Locate the element using the Developer Web Tool\n• Identify the class inside the HTML element\n• Find the class in the file",
    type: "text",
    timestamp: "09:18 AM",
  },
  {
    id: 4,
    sender: "Marcelo",
    content:
      "If using Website Builders:\n\nIf you use a builder like Divi Builder or Elementor, follow these steps:\n\n• Go to the left sidebar\n• Locate the Pages section (Pages → Home) and enter the page\n• Start your builder\n• Select the element to style and apply changes – these builders allow you to edit both as code and through a no-code interface.",
    type: "text",
    timestamp: "09:19 AM",
  },
  {
    id: 4.5,
    sender: "Marcelo",
    content: "Task 1 Reference",
    type: "image",
    imageUrl: "/assets/Task1.png",
    timestamp: "09:20 AM",
  },

  // Conversation 2: Forminator Issue
  {
    id: 5,
    sender: "Client",
    content:
      "TASK 2: Hello there!\n\nI was tweaking a form using the Forminator plugin, and somehow I lost the submit button in the front-end. I am uncertain if I caused that and can't provide access to my website currently as it's under development. I did export the form for you though, can you check what I might have done wrong there?\n\nThank you.",
    type: "text",
    timestamp: "10:30 AM",
  },
  {
    id: 6,
    sender: "Marcelo",
    content:
      "Hello! It's Marcelo from the Tech Support team.\n\nLet's check what's going on with your form.\n\nFirst, log in to your WordPress panel and go to Forminator → Forms.\n\nOnce you're in the Form editor, go to the Submit Configuration button, then navigate to Visibility → read the condition – it should be set to \"Show - All\".\n\nThen please save changes and apply them.\n\nIf it's not working after this, please contact me again :)",
    type: "text",
    timestamp: "10:35 AM",
  },
  {
    id: 6.5,
    sender: "Marcelo",
    content: "Task 2 Reference",
    type: "image",
    imageUrl: "/assets/Task2.png",
    timestamp: "10:36 AM",
  },

  // Conversation 3: Smush Plugin Issue
  {
    id: 7,
    sender: "Client",
    content:
      "TASK 3: I already tried to get some help from ChatGPT, but the recommendations I'm getting don't make much sense, and I really do hope the plugin didn't just watermark all of our images!\n\nPlease advise.",
    type: "text",
    timestamp: "11:45 AM",
  },
  {
    id: 8,
    sender: "Marcelo",
    content:
      "Hello! It's me again, Marcelo from the Tech Support team.\n\nWhatever the AI answered you is wrong – I'll tell you why.\n\nWP Smush is an image optimizer. The border shown around your images isn't a watermark or something similar; it might be a CSS issue.\n\nFirst, let's locate the element. Please open Web Developer Mode (Ctrl + Shift + C), then click on the element with the issue and identify its class.",
    type: "text",
    timestamp: "11:50 AM",
  },
  {
    id: 9,
    sender: "Marcelo",
    content:
      "Log in to your WordPress panel:\n\nIf you use a Theme Builder: Go to the page, locate the section, and modify the Border Color through the interface\n\nIf you use the default WordPress theme with CSS: You can remove the property. Here's a sample for removing that yellow line:",
    type: "text",
    timestamp: "11:51 AM",
  },
  {
    id: 10,
    sender: "Marcelo",
    content: "",
    type: "code",
    code: {
      language: "css",
      content: `.issued-element img {
  border: none !important;
  outline: none !important;
}`,
    },
    timestamp: "11:51 AM",
  },
  {
    id: 11,
    sender: "Marcelo",
    content: "If it's not working after this, please contact me :)",
    type: "text",
    timestamp: "11:52 AM",
  },
  {
    id: 11.5,
    sender: "Marcelo",
    content: "Task 3 Reference",
    type: "image",
    timestamp: "11:53 AM",
  },

  // Conversation 4: Performance Test
  {
    id: 12,
    sender: "Client",
    content:
      "TASK 4: Hello there!\n\nMy client really needs to improve the Performance Test results (Pagespeed Insights) for the homepage of his site: https://tasksheet.tempurl.host/promo/\n\nEspecially under the Mobile view, score gets lower than 70!\n\nGoogle recommendations always trouble me, can you please explain with simple words what I have to do specifically to my site, apart from simply installing plugins, to improve that?\n\nThank you.",
    type: "text",
    timestamp: "02:15 PM",
  },
  {
    id: 13,
    sender: "Marcelo",
    content:
      "Hello! It's Marcelo again.\n\nI'll break this down in simple terms:\n\n• Time to Interactive Indicator: This means the time when the website becomes usable\n• Total Blocking Time: This is when JavaScript blocks user interaction\n\nLet's start with the first indicator, Time to Interactive. The biggest impact might be due to large image sizes that degrade website performance.",
    type: "text",
    timestamp: "02:20 PM",
  },
  {
    id: 14,
    sender: "Marcelo",
    content:
      "You can manually:\n\n• Optimize browser cache\n• Re-upload compressed assets\n• Implement lazy loading\n\nAlternatively, you can add an automatic plugin for better performance. Check the link below:\n\nActivate the plugin, click on the Wizard, and it will automatically start optimizing your website.\nhttps://wpmudev.com/project/wp-hummingbird/",
    type: "text",
    timestamp: "02:21 PM",
  },
  {
    id: 14.5,
    sender: "Marcelo",
    content: "Task 4 Reference",
    type: "image",
    imageUrl: "/assets/Task 4.png",
    timestamp: "02:22 PM",
  },

  // Conversation 5: PHP Code Issue
  {
    id: 15,
    sender: "Client",
    content:
      "TASK 5: Hello there!\n\nI've created a simple shortcode snippet, so I can use it on my widgets. The code displays a simple subscription form, but before that, it should display the name of the current logged-in user. I am not sure why, but it doesn't show that name, even when testing with a default theme and no plugin enabled.\n\nCan you please assist with that?\n\nThank you.",
    type: "text",
    timestamp: "04:00 PM",
  },
  {
    id: 16,
    sender: "Marcelo",
    content:
      "Hello! It's Marcelo from Tech Support.\n\nThe code you provided has the following mistake:",
    type: "text",
    timestamp: "04:10 PM",
  },
  {
    id: 17,
    sender: "Marcelo",
    content: "",
    type: "code",
    code: {
      language: "php",
      content: `$user_display_name = wp_get_current_user()->user_firstname;`,
    },
    timestamp: "04:10 PM",
  },
  {
    id: 18,
    sender: "Marcelo",
    content:
      "The issue here is that WordPress accesses the object instead of its properties (name, last name, email, etc.).\n\nI'll provide you with code that achieves the following:\n\nFirst, it retrieves the user object, checks if the user exists, and if so, shows the property $user_display_name. If the user doesn't exist, we handle this case by replacing the name with \"Guest\".",
    type: "text",
    timestamp: "04:11 PM",
  },
  {
    id: 19,
    sender: "Marcelo",
    content: "",
    type: "code",
    code: {
      language: "php",
      content: `$current_user = wp_get_current_user();
if ($current_user->exists()) {
    $user_display_name = $current_user->user_firstname;
    if (empty($user_display_name)) {
        $user_display_name = $current_user->display_name;
    }
} else {
    $user_display_name = 'Guest';
}`,
    },
    timestamp: "04:12 PM",
  },
  {
    id: 19.5,
    sender: "Marcelo",
    content: "Task 5 Reference",
    type: "image",
    timestamp: "04:13 PM",
  },
];

function CodeBlock({ code, language }: { code: string; language: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group mt-1.5">
      <div className="absolute -top-6 left-0 right-0 flex items-center justify-between px-3 py-1.5 bg-[var(--background-secondary)] rounded-t-lg border border-[var(--glass-border)] border-b-0">
        <span className="text-[10px] font-mono text-[var(--primary-orange)] uppercase tracking-wider">
          {language}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-[10px] text-[var(--foreground-secondary)] hover:text-[var(--primary-orange)] transition-colors"
        >
          {copied ? (
            <>
              <Check size={12} />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy size={12} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="bg-[var(--background-secondary)] border border-[var(--glass-border)] rounded-lg p-3 overflow-x-auto">
        <code className="text-xs font-mono text-[var(--foreground)] leading-relaxed whitespace-pre">
          {code}
        </code>
      </pre>
    </div>
  );
}

export default function ChatInterface() {
  const [messages] = useState<Message[]>(conversations);
  const [newMessage, setNewMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    // Message sending logic would go here
    setNewMessage("");
  };

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <div className="glass-card overflow-hidden flex flex-col h-[calc(100vh-200px)] max-h-[650px]">
        {/* Chat Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex flex-col ${
                message.sender === "Client" ? "items-end" : "items-start"
              }`}
            >
              {/* Sender Name and Timestamp */}
              <div className="flex items-center gap-2 mb-1.5 px-1">
                <span
                  className={`text-xs font-semibold ${
                    message.sender === "Marcelo"
                      ? "text-[var(--primary-orange)]"
                      : "text-[var(--foreground-secondary)]"
                  }`}
                >
                  {message.sender}
                </span>
                <span className="text-[10px] text-[var(--foreground-muted)]">
                  {message.timestamp}
                </span>
              </div>

              {/* Message Content */}
              {message.type === "text" && (
                <div
                  className={`max-w-[85%] md:max-w-[75%] px-4 py-3 rounded-2xl ${
                    message.sender === "Client"
                      ? "glass-card border-[var(--primary-orange)] border-opacity-30 rounded-tr-sm"
                      : "bg-[var(--background-secondary)] border border-[var(--glass-border)] rounded-tl-sm"
                  }`}
                >
                  <p className="text-xs md:text-sm leading-relaxed text-[var(--foreground)] whitespace-pre-line">
                    {message.content}
                  </p>
                </div>
              )}

              {message.type === "code" && message.code && (
                <div className="max-w-[85%] md:max-w-[75%] w-full">
                  <CodeBlock
                    code={message.code.content}
                    language={message.code.language}
                  />
                </div>
              )}

              {message.type === "image" && message.imageUrl && (
                <div
                  className={`max-w-[60%] md:max-w-[50%] cursor-pointer group ${
                    message.sender === "Client"
                      ? "rounded-tr-sm"
                      : "rounded-tl-sm"
                  }`}
                  onClick={() => handleImageClick(message.imageUrl!)}
                >
                  <div className="relative overflow-hidden rounded-xl border-2 border-[var(--glass-border)] group-hover:border-[var(--primary-orange)] transition-all duration-300">
                    <Image
                      src={message.imageUrl}
                      alt="Shared image"
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                      <span className="text-white opacity-0 group-hover:opacity-100 text-xs font-medium bg-black/50 px-2 py-1 rounded-full transition-opacity duration-300">
                        Click to enlarge
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="border-t border-[var(--glass-border)] p-3 bg-[var(--card-bg)]">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-[var(--background-secondary)] text-[var(--foreground)] placeholder-[var(--foreground-muted)] rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-orange)] transition-all border border-[var(--glass-border)]"
            />
            <button
              type="submit"
              className="btn-primary rounded-full px-5 py-2.5 flex items-center gap-2 text-sm"
            >
              <Send size={16} />
              <span className="hidden md:inline font-semibold">Send</span>
            </button>
          </form>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <ImageModal imageUrl={selectedImage} onClose={closeModal} />
      )}
    </>
  );
}
