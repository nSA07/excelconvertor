import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function App() {
  const { t, i18n } = useTranslation();

  const [delimiter, setDelimiter] = useState(",");
  const [copyMessage, setCopyMessage] = useState<string | null>(null);

  // Tab 1
  const [inputCol, setInputCol] = useState("");
  const [outputRow, setOutputRow] = useState("");

  const convertColToRow = () => {
    if (!inputCol.trim()) return setOutputRow("");
    const items = inputCol.split(/\r?\n+/).map(x => x.trim()).filter(Boolean);
    setOutputRow(items.join(delimiter));
  };

  // Tab 2
  const [inputRow, setInputRow] = useState("");
  const [outputCol, setOutputCol] = useState("");

  const convertRowToCol = () => {
    if (!inputRow.trim()) return setOutputCol("");
    const items = inputRow.split(delimiter).map(x => x.trim()).filter(Boolean);
    setOutputCol(items.join("\n"));
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
      <Card className="w-full max-w-xl shadow-lg">
        <CardHeader className="flex justify-between items-center">
          <CardTitle className="text-lg text-center w-full">
            {t("title")}
          </CardTitle>
          <Select
            value={i18n.language}
            onValueChange={(lng) => changeLang(lng as "en" | "uk")}
          >
            <SelectTrigger className="w-20 justify-center">
              <SelectValue>{i18n.language === "en" ? "EN" : "UA"}</SelectValue>
            </SelectTrigger>
            <SelectContent align="end" className="min-w-[6rem]">
              <SelectItem value="en">EN</SelectItem>
              <SelectItem value="uk">UA</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="col2row" className="w-full">
            <TabsList className="grid grid-cols-2 w-full mb-4">
              <TabsTrigger value="col2row">{t("tabs.col2row")}</TabsTrigger>
              <TabsTrigger value="row2col">{t("tabs.row2col")}</TabsTrigger>
            </TabsList>

            {/* Tab 1 */}
            <TabsContent value="col2row" className="space-y-4">
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

              {/* Input */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <p className="text-sm text-gray-500">{t("paste_label")}</p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => setInputCol("")}>
                      {t("clear")}
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => copyToClipboard(inputCol, "input")} disabled={!inputCol}>
                      {t("copy")}
                    </Button>
                  </div>
                </div>
                <Textarea
                  value={inputCol}
                  onChange={(e) => setInputCol(e.target.value)}
                  placeholder={t("placeholder_input")}
                  className="resize-none"
                />
              </div>

              <Button className="w-full" onClick={convertColToRow}>
                {t("convert")}
              </Button>

              {/* Output */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <p className="text-sm text-gray-500">{t("result_label")}</p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => setOutputRow("")}>
                      {t("clear")}
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => copyToClipboard(outputRow, "output")} disabled={!outputRow}>
                      {t("copy")}
                    </Button>
                  </div>
                </div>
                <Textarea
                  value={outputRow}
                  readOnly
                  placeholder={t("placeholder_output")}
                  className="resize-none"
                  onFocus={(e) => e.target.select()}
                />
              </div>
            </TabsContent>

            {/* Tab 2 */}
            <TabsContent value="row2col" className="space-y-4">
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

              {/* Input */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <p className="text-sm text-gray-500">{t("paste_label")}</p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => setInputRow("")}>
                      {t("clear")}
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => copyToClipboard(inputRow, "input")} disabled={!inputRow}>
                      {t("copy")}
                    </Button>
                  </div>
                </div>
                <Textarea
                  value={inputRow}
                  onChange={(e) => setInputRow(e.target.value)}
                  placeholder={t("placeholder_input")}
                  className="resize-none"
                />
              </div>

              <Button className="w-full" onClick={convertRowToCol}>
                {t("convert")}
              </Button>

              {/* Output */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <p className="text-sm text-gray-500">{t("result_label")}</p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => setOutputCol("")}>
                      {t("clear")}
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => copyToClipboard(outputCol, "output")} disabled={!outputCol}>
                      {t("copy")}
                    </Button>
                  </div>
                </div>
                <Textarea
                  value={outputCol}
                  readOnly
                  placeholder={t("placeholder_output")}
                  className="resize-none"
                  onFocus={(e) => e.target.select()}
                />
              </div>
            </TabsContent>
          </Tabs>

          {copyMessage && (
            <p className="text-center text-green-600 text-sm mt-2">
              ✅ {copyMessage}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}