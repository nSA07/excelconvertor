import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function App() {
  const { t, i18n } = useTranslation();
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [delimiter, setDelimiter] = useState(",");
  const [copyMessage, setCopyMessage] = useState<string | null>(null);

  const convert = () => {
    if (!input.trim()) {
      setOutput("");
      return;
    }

    const items = input
      .split(/\r?\n+/)
      .map((x) => x.trim())
      .filter(Boolean);

    setOutput(items.join(delimiter));
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
  };

  const copyToClipboard = async (text: string, field: string) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopyMessage(t("copied", { field }));
      setTimeout(() => setCopyMessage(null), 1500);
    } catch {
      alert("Не вдалося скопіювати 😞");
    }
  };

  const changeLang = (lng: "en" | "uk") => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lang", lng);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-xl">
        <CardHeader className="flex justify-between items-center">
          <CardTitle className="text-xl text-center w-full">
            {t("title")}
          </CardTitle>
          <Select
            value={i18n.language}
            onValueChange={(lng) => changeLang(lng as "en" | "uk")}
          >
            <SelectTrigger className="w-20 justify-center">
              <SelectValue>
                {i18n.language === "en" ? "EN" : "UA"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent align="end" className="min-w-[6rem]">
              <SelectItem value="en">EN</SelectItem>
              <SelectItem value="uk">UA</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>

        <CardContent className="space-y-4">
          <Select value={delimiter} onValueChange={setDelimiter}>
            <SelectTrigger>
              <SelectValue placeholder={t("select_delimiter")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value=",">{t("delimiters.comma")}</SelectItem>
              <SelectItem value=";">{t("delimiters.semicolon")}</SelectItem>
              <SelectItem value="|">{t("delimiters.pipe")}</SelectItem>
              <SelectItem value=" ">{t("delimiters.space")}</SelectItem>
            </SelectContent>
          </Select>

          {/* Вхідне поле */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <p className="text-sm text-gray-500">{t("paste_label")}</p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => setInput("")}>
                  {t("clear")}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyToClipboard(input, "input")}
                  disabled={!input}
                >
                  {t("copy")}
                </Button>
              </div>
            </div>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t("placeholder_input")}
              className="resize-none"
            />
          </div>

          <Button className="w-full" onClick={convert}>
            {t("convert")}
          </Button>

          {/* Вихідне поле */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <p className="text-sm text-gray-500">{t("result_label")}</p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => setOutput("")}>
                  {t("clear")}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyToClipboard(output, "output")}
                  disabled={!output}
                >
                  {t("copy")}
                </Button>
              </div>
            </div>
            <Textarea
              value={output}
              readOnly
              placeholder={t("placeholder_output")}
              className="resize-none"
              onFocus={(e) => e.target.select()}
            />
          </div>

          <div className="flex justify-end">
            <Button variant="destructive" onClick={clearAll}>
              {t("clear_all")}
            </Button>
          </div>

          {copyMessage && (
            <p className="text-center text-green-600 text-sm">
              ✅ {copyMessage}
            </p>
          )}
        </CardContent>
      </Card>

      <footer className="mt-6 text-sm text-gray-500 flex items-center gap-2 select-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-10 h-10 text-green-600"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <rect x="3" y="3" width="18" height="18" rx="3" ry="3" fill="currentColor" opacity="0.1" />
          <rect x="7" y="7" width="10" height="10" rx="1" ry="1" fill="currentColor" className="text-green-500" />
          <text x="12" y="16" fontSize="8" textAnchor="middle" fill="white" fontFamily="sans-serif">E</text>
        </svg>
        <span>{t("footer")}</span>
      </footer>
    </div>
  );
}
