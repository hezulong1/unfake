import { useState } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const Route = createFileRoute('/auth/login')({
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // TODO: 实现真实的认证逻辑
      // await loginApi(formData.email, formData.password);

      // 模拟 API 请求延迟
      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });

      if (formData.email && formData.password) {
        // 成功登陆，重定向到首页
        navigate({ to: '/' });
      } else {
        setError('请填写所有必需字段');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '登陆失败，请稍后重试');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-background via-background to-muted/20 p-4">
      <div className="w-full max-w-md">
        { /* Logo/Header */ }
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center justify-center size-12 rounded-xl bg-primary/10">
            <Lock className="size-6 text-primary" data-icon="inline-start" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">欢迎回来</h1>
          <p className="mt-2 text-sm text-muted-foreground">登陆您的智能打印账户</p>
        </div>

        { /* Login Card */ }
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">登陆</CardTitle>
            <CardDescription>输入您的邮箱和密码以继续</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              { /* Error Message */ }
              { error && (
                <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive border border-destructive/20">
                  { error }
                </div>
              ) }

              { /* Email Field */ }
              <div className="space-y-2">
                <Label htmlFor="email">邮箱地址</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isLoading}
                    required
                    className="pl-10"
                    aria-invalid={error ? 'true' : 'false'}
                  />
                </div>
              </div>

              { /* Password Field */ }
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">密码</Label>
                  <a
                    href="#"
                    className="text-xs text-primary hover:underline underline-offset-2"
                  >
                    忘记密码?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="输入您的密码"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={isLoading}
                    required
                    className="pl-10 pr-10"
                    aria-invalid={error ? 'true' : 'false'}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground disabled:opacity-50 transition-colors"
                    aria-label={showPassword ? '隐藏密码' : '显示密码'}
                  >
                    { showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" /> }
                  </button>
                </div>
              </div>

              { /* Remember Me */ }
              <div className="flex items-center gap-2">
                <input
                  id="remember"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                  disabled={isLoading}
                  className="size-4 rounded border border-input cursor-pointer accent-primary"
                />
                <Label htmlFor="remember" className="cursor-pointer">
                  记住我
                </Label>
              </div>

              { /* Submit Button */ }
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full"
              >
                { isLoading && <Loader2 className="size-4 animate-spin" data-icon="inline-start" /> }
                { isLoading ? '登陆中...' : '登陆' }
              </Button>

              { /* Divider */ }
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-muted" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">或</span>
                </div>
              </div>

              { /* Sign Up Link */ }
              <div className="text-center text-sm text-muted-foreground">
                还没有账户?
                { ' ' }
                <a
                  href="#"
                  className="font-medium text-primary hover:underline underline-offset-2"
                >
                  立即注册
                </a>
              </div>
            </form>
          </CardContent>
        </Card>

        { /* Footer Info */ }
        <p className="mt-8 text-center text-xs text-muted-foreground">
          点击登陆，表示您同意我们的
          { ' ' }
          <a href="#" className="hover:underline">
            服务条款
          </a>
          { ' ' }
          和
          { ' ' }
          <a href="#" className="hover:underline">
            隐私政策
          </a>
        </p>
      </div>
    </div>
  );
}
