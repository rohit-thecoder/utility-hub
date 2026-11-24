"use client";

import { Component, type ReactNode } from "react";

export class ToolErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { /* The isolated workspace remains recoverable. */ }
  render() { return this.state.failed ? <div className="surface rounded-2xl border-orange-200 bg-orange-50 p-8 text-center"><p className="font-display text-lg font-bold text-slate-900">That file needs a fresh start.</p><p className="mt-2 text-sm text-slate-600">No work was sent anywhere. Reset the workspace and try another file.</p><button onClick={() => this.setState({ failed: false })} className="mt-5 rounded-xl bg-orange-500 px-5 py-3 text-sm font-bold text-white">Reset Tool</button></div> : this.props.children; }
}
