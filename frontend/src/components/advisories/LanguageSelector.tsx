"use client";

import { Globe, Download, Share2, Clock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAQIStore } from "@/store/useAQIStore";

export default function LanguageSelector() {
  const language = useAQIStore((state) => state.language);
  const setLanguage = useAQIStore((state) => state.setLanguage);
  const loading = useAQIStore((state) => state.loading);
  const dashboard = useAQIStore((state) => state.dashboard);
  const t = useAQIStore((state) => state.translations);

  return (
    <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-none space-y-6">
      <div>
        <h3 className="font-serif text-xl font-semibold text-[#111827]">
          {t.toolkit ?? "Citizen Toolkit"}
        </h3>
        <p className="mt-1 text-sm text-[#6B7280]">
          {t.toolkitDescription ?? "Choose your preferred language and access advisory tools."}
        </p>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-medium uppercase tracking-[0.14em] text-[#6B7280]">
          {t.language ?? "Preferred Language"}
        </label>
        <Select
          value={language}
          onValueChange={async (value) => {
            if (!value) return;
            await setLanguage(value);
          }}
        >
          <SelectTrigger className="w-full rounded-xl border-[#E5E7EB] bg-[#FAFBFC]" disabled={loading}>
            <Globe className="mr-2 h-4 w-4 text-[#2563EB]" />
            <SelectValue />
            {loading && <Loader2 className="ml-auto h-4 w-4 animate-spin text-[#2563EB]" />}
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="hi">हिन्दी</SelectItem>
            <SelectItem value="bn">বাংলা</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Button variant="outline" className="justify-start rounded-full border-[#E5E7EB] bg-white text-[#6B7280]" disabled>
          <Download className="mr-2 h-4 w-4" />
          {t.download ?? "Download Advisory"}
        </Button>

        <Button variant="outline" className="justify-start rounded-full border-[#E5E7EB] bg-white text-[#6B7280]" disabled>
          <Share2 className="mr-2 h-4 w-4" />
          {t.share ?? "Share Advisory"}
        </Button>
      </div>

      <div className="flex items-center gap-2 rounded-xl border border-[#E5E7EB] bg-[#FAFBFC] p-3.5 text-xs text-[#6B7280]">
        <Clock className="h-4 w-4 text-[#2563EB]" />
        <span>{t.lastUpdated ?? "Last Updated"}:</span>
        <span className="font-medium text-[#111827]">
          {dashboard?.latest_prediction?.timestamp ?? "Live Feed"}
        </span>
      </div>
    </div>
  );
}