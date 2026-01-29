import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { getUserLinks } from '@/data/links';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link2, ExternalLink, Copy } from 'lucide-react';
import { CreateLinkDialog } from './create-link-dialog';
import { EditLinkDialog } from './edit-link-dialog';
import { DeleteLinkDialog } from './delete-link-dialog';

export default async function Dashboard() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect('/');
  }
  
  const userLinks = await getUserLinks(userId);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Your Links</h1>
            <p className="text-zinc-400 mt-2">
              Manage and track all your shortened links
            </p>
          </div>
          <CreateLinkDialog />
        </div>

        {/* Links List */}
        {userLinks.length === 0 ? (
          <Card className="bg-zinc-800/50 border-zinc-700">
            <CardContent className="p-12">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-zinc-700/50 flex items-center justify-center mx-auto">
                  <Link2 className="w-8 h-8 text-zinc-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    No links yet
                  </h3>
                  <p className="text-zinc-400">
                    Get started by creating your first shortened link
                  </p>
                </div>
                <CreateLinkDialog>
                  <Button className="mt-4">
                    <Link2 className="w-4 h-4 mr-2" />
                    Create Your First Link
                  </Button>
                </CreateLinkDialog>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {userLinks.map((link) => (
              <Card 
                key={link.id} 
                className="bg-zinc-800/50 border-zinc-700 hover:bg-zinc-800/70 transition-colors"
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-white flex items-center gap-2">
                        <Link2 className="w-5 h-5 text-blue-500 flex-shrink-0" />
                        <span className="font-mono text-lg">/{link.shortCode}</span>
                      </CardTitle>
                      <CardDescription className="mt-2 break-all">
                        {link.originalUrl}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <Button variant="outline" size="icon">
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                      <EditLinkDialog link={link} />
                      <DeleteLinkDialog link={link} />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-sm text-zinc-400">
                    <span>
                      Created {link.createdAt.toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
