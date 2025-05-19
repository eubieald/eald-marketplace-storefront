import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';

export default function Home() {
  return (
    <div className="flex flex-col gap-5 p-5">
      <p className="text-rose-500 font-bold text-3xl">This is the home page.</p>

      <Button variant={'elevated'} className="w-[200px]">
        Hello World
      </Button>
      <Input placeholder="I am an input" />
      <Textarea placeholder="I am a textarea" />
      <div>
        <Progress value={50} />
      </div>
      <Checkbox defaultChecked />
    </div>
  );
}
