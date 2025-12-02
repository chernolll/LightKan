import React, { useState } from 'react';
import { Layout, ArrowRight, Lock, Mail, User, CheckCircle2 } from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
}

type AuthMode = 'login' | 'register';

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // For registration
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const toggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    setError('');
    // Optional: Clear fields or keep them
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // 具体的验证逻辑
    if (!email.trim()) {
      setError('请输入邮箱地址');
      return;
    }
    if (!email.includes('@')) {
      setError('请输入有效的邮箱格式');
      return;
    }
    if (mode === 'register' && !name.trim()) {
      setError('请输入您的昵称');
      return;
    }
    if (!password) {
      setError('密码不能为空');
      return;
    }
    if (password.length < 6) {
      setError('密码长度至少需要6位');
      return;
    }

    setIsLoading(true);

    // 模拟网络请求延迟
    setTimeout(() => {
      // 模拟注册/登录成功
      // 设置 Cookie，有效期1天
      document.cookie = "kanban-auth=true; path=/; max-age=86400";
      
      // 如果是注册，理论上这里应该保存用户信息，但 Demo 中直接通过
      onLogin();
    }, 1000);
  };

  const isLogin = mode === 'login';

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-indigo-600 to-indigo-800 skew-y-[-6deg] origin-top-left transform -translate-y-24 z-0"></div>
      
      <div className="relative z-10 w-full max-w-md">
        {/* Brand Logo */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-3 text-white">
            <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm border border-white/30 shadow-inner">
              <Layout size={32} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">KanbanFlow AI</h1>
          </div>
        </div>

        {/* Auth Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-slate-800">
                {isLogin ? '欢迎回来' : '创建新账户'}
              </h2>
              <p className="text-slate-500 mt-2 text-sm">
                {isLogin ? '请输入您的账户凭证以访问工作区' : '注册以开始管理您的项目'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Name Input (Register Only) */}
              {!isLogin && (
                <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">全名 / 昵称</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                      <User size={18} />
                    </div>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all sm:text-sm"
                      placeholder="您的名字"
                    />
                  </div>
                </div>
              )}

              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">电子邮箱</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all sm:text-sm"
                    placeholder="name@company.com"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">密码</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                    <Lock size={18} />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all sm:text-sm"
                    placeholder={isLogin ? "••••••••" : "设置您的密码 (至少6位)"}
                  />
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="flex items-center gap-2 text-red-600 text-xs bg-red-50 py-2.5 px-3 rounded-lg border border-red-100 animate-in fade-in slide-in-from-top-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all mt-6"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>{isLogin ? '登录' : '注册账户'}</span>
                    <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>
          
          {/* Toggle Footer */}
          <div className="px-8 py-4 bg-slate-50 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-500">
              {isLogin ? '还没有账号？' : '已有账号？'} 
              <button 
                onClick={toggleMode}
                className="ml-1 text-indigo-600 hover:text-indigo-500 font-medium hover:underline focus:outline-none"
              >
                {isLogin ? '立即注册' : '直接登录'}
              </button>
            </p>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-indigo-200/80">
          &copy; 2023 KanbanFlow AI. All rights reserved.
        </p>
      </div>
    </div>
  );
};