"use client";

import {
  Globe,
  Download,
  Share2,
  Clock,
  Loader2,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
  const language = useAQIStore(
    (state) => state.language
  );

  const setLanguage = useAQIStore(
    (state) => state.setLanguage
  );

  const loading = useAQIStore(
    (state) => state.loading
  );

  const dashboard = useAQIStore(
    (state) => state.dashboard
  );

  const t = useAQIStore(
    (state) => state.translations
  );

  return (
    <Card>

      <CardHeader>

        <CardTitle>

          {t.toolkit ?? "Citizen Toolkit"}

        </CardTitle>

        <CardDescription>

          {t.toolkitDescription ??
            "Choose your preferred language and access advisory tools."}

        </CardDescription>

      </CardHeader>

      <CardContent className="space-y-6">

        <div className="space-y-2">

          <label className="text-sm font-medium">

            {t.language ?? "Preferred Language"}

          </label>

          <Select
            value={language}
            onValueChange={async (value) => {
              if (!value) return;

              await setLanguage(value);
            }}
          >

            <SelectTrigger
              className="w-full"
              disabled={loading}
            >

              <Globe className="mr-2 h-4 w-4" />

              <SelectValue />

              {loading && (
                <Loader2 className="ml-auto h-4 w-4 animate-spin" />
              )}

            </SelectTrigger>

            <SelectContent>

              <SelectItem value="en">
                English
              </SelectItem>

              <SelectItem value="hi">
                हिन्दी
              </SelectItem>

              <SelectItem value="bn">
                বাংলা
              </SelectItem>

            </SelectContent>

          </Select>

        </div>

        <div className="grid gap-4 md:grid-cols-2">

          <Button
            variant="outline"
            className="justify-start"
            disabled
          >

            <Download className="mr-2 h-4 w-4" />

            {t.download ??
              "Download Advisory"}

          </Button>

          <Button
            variant="outline"
            className="justify-start"
            disabled
          >

            <Share2 className="mr-2 h-4 w-4" />

            {t.share ??
              "Share Advisory"}

          </Button>

        </div>

        <div className="flex items-center gap-2 rounded-lg bg-muted/40 p-3 text-sm text-muted-foreground">

          <Clock className="h-4 w-4" />

          <span>

            {t.lastUpdated ??
              "Last Updated"}:

          </span>

          <span>

            {dashboard?.latest_prediction
              ?.timestamp ?? "--"}

          </span>

        </div>

      </CardContent>

    </Card>
  );
}