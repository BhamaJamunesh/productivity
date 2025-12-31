import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertQuestSchema, type InsertQuest, RARITY_LEVELS, QUEST_TYPES } from "@shared/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { useGameStore } from "@/lib/store";
import { useState } from "react";
import { z } from "zod";

// Frontend validation schema might need tweaking from backend one due to coercions
const formSchema = insertQuestSchema.extend({
  xp: z.coerce.number().min(1, "XP must be at least 1"),
});

export function CreateQuestDialog() {
  const [open, setOpen] = useState(false);
  const createQuest = useGameStore((state) => state.createQuest);
  
  const form = useForm<InsertQuest>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      rarity: "Common",
      type: "normal",
      xp: 50,
    },
  });

  function onSubmit(values: InsertQuest) {
    createQuest(values);
    setOpen(false);
    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="neon" className="gap-2">
          <Plus className="w-4 h-4" /> New Quest
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-card/95 border-primary/20 backdrop-blur-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display text-primary uppercase tracking-widest">Initialize Quest</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Define a new objective for your hunter protocol.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs font-bold text-primary/80">Objective Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Morning Workout Protocol" {...field} className="bg-black/50 border-white/10 focus:border-primary/50" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="rarity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-primary/80">Rarity</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-black/50 border-white/10">
                          <SelectValue placeholder="Select rarity" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-card border-white/10">
                        {RARITY_LEVELS.map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-primary/80">Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-black/50 border-white/10">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-card border-white/10">
                        {QUEST_TYPES.map((type) => (
                          <SelectItem key={type} value={type} className="capitalize">
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="xp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs font-bold text-primary/80">XP Reward</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} className="bg-black/50 border-white/10 focus:border-primary/50" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs font-bold text-primary/80">Briefing (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Additional mission parameters..." 
                      className="resize-none bg-black/50 border-white/10 focus:border-primary/50 min-h-[80px]" 
                      {...field} 
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pt-4 flex justify-end gap-2">
              <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="submit" variant="default" className="w-32">Initialize</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
