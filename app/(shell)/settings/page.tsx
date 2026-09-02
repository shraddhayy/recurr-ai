"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Camera, Trash2 } from "lucide-react";

import { PageHeader } from "@/components/patterns/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, FormField } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { initials } from "@/lib/utils";

const notificationPrefs = [
  { id: "renewals", label: "Upcoming renewals", description: "Get notified 3 days before a subscription renews" },
  { id: "savings", label: "New savings opportunities", description: "When Recurr AI finds a way to cut costs" },
  { id: "anomalies", label: "Unusual charges", description: "Alerts for charges that break your normal pattern" },
  { id: "digest", label: "Weekly digest", description: "A Monday-morning summary of your subscription activity" },
];

export default function SettingsPage() {
  const { toast } = useToast();
  const { user, isLoaded } = useUser();
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState("");
  const [nameInitialized, setNameInitialized] = useState(false);

  // Adjust state during render (React-recommended pattern) instead of an
  // effect: once the real user loads, seed the editable name field from it,
  // exactly once, without an extra render-after-commit round trip.
  if (user && !nameInitialized) {
    setNameInitialized(true);
    setName((user.unsafeMetadata?.displayName as string | undefined) || user.fullName || "");
  }
  const [prefs, setPrefs] = useState<Record<string, boolean>>({
    renewals: true,
    savings: true,
    anomalies: true,
    digest: false,
  });

  const email = user?.primaryEmailAddress?.emailAddress ?? "";

  async function handleSave() {
    if (!user) return;
    setSaving(true);
    try {
      await user.update({
        unsafeMetadata: { ...user.unsafeMetadata, displayName: name },
      });
      toast({ title: "Settings saved", description: "Your preferences were updated.", variant: "success" });
    } catch (err) {
      console.error("Failed to save settings:", err);
      toast({ title: "Couldn't save changes", description: "Please try again.", variant: "error" });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="Settings"
        title="Account and preferences"
        description="Manage your profile, notification preferences, and how Recurr AI works for you."
      />

      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>This information is visible only to you.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6 pt-2">
          <div className="flex items-center gap-4">
            {!isLoaded ? (
              <Skeleton className="size-16 rounded-full" />
            ) : (
              <Avatar className="size-16">
                {user?.imageUrl && <AvatarImage src={user.imageUrl} alt={name} />}
                <AvatarFallback className="text-[18px]">{initials(name || "?")}</AvatarFallback>
              </Avatar>
            )}
            <Button variant="outline" size="sm">
              <Camera className="size-3.5" />
              Change photo
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <FormField label="Full name" htmlFor="name">
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </FormField>
            <FormField label="Email address" htmlFor="email" helperText="Managed by your account provider">
              <Input id="email" value={email} disabled />
            </FormField>
            <FormField label="Currency" htmlFor="currency">
              <Select defaultValue="usd">
                <SelectTrigger id="currency">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usd">USD — US Dollar</SelectItem>
                  <SelectItem value="eur">EUR — Euro</SelectItem>
                  <SelectItem value="gbp">GBP — British Pound</SelectItem>
                  <SelectItem value="inr">INR — Indian Rupee</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
            <FormField label="Time zone" htmlFor="timezone">
              <Select defaultValue="pt">
                <SelectTrigger id="timezone">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pt">Pacific Time (PT)</SelectItem>
                  <SelectItem value="et">Eastern Time (ET)</SelectItem>
                  <SelectItem value="ist">India Standard Time (IST)</SelectItem>
                  <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
          </div>
        </CardContent>
        <CardFooter className="justify-end border-t border-divider pt-5">
          <Button
            variant="ghost"
            size="md"
            onClick={() =>
              setName((user?.unsafeMetadata?.displayName as string | undefined) || user?.fullName || "")
            }
          >
            Cancel
          </Button>
          <Button size="md" loading={saving} onClick={handleSave}>
            Save changes
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Choose what Recurr AI should keep you posted about.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col pt-2">
          {notificationPrefs.map((pref, i) => (
            <div key={pref.id}>
              <div className="flex items-center justify-between gap-4 py-3.5">
                <div>
                  <Label htmlFor={pref.id}>{pref.label}</Label>
                  <p className="mt-0.5 text-[12.5px] text-text-secondary">{pref.description}</p>
                </div>
                <Switch
                  id={pref.id}
                  checked={prefs[pref.id]}
                  onCheckedChange={(checked) => setPrefs((p) => ({ ...p, [pref.id]: checked }))}
                />
              </div>
              {i < notificationPrefs.length - 1 && <Separator />}
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-error-50">
        <CardHeader>
          <CardTitle className="text-error-strong">Danger zone</CardTitle>
          <CardDescription>Deleting your account removes all tracked subscriptions and insights.</CardDescription>
        </CardHeader>
        <CardFooter className="pt-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive" size="md">
                <Trash2 className="size-4" />
                Delete account
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete your account?</DialogTitle>
                <DialogDescription>
                  This permanently removes your subscriptions, insights, and saved preferences. This
                  action can&apos;t be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogBody />
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button variant="destructive">Delete account</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </div>
  );
}
