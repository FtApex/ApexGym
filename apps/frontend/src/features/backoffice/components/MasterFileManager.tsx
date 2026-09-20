"use client";

import React, { useState } from 'react';
import { FolderArchive, Copy, Check, Trash2, Eye, FileText, Folder } from 'lucide-react';
import { R2MasterFile } from '@/shared/types';
import { ActionButton } from '../../../shared/components/ActionButton';

interface MasterFileManagerProps {
  files: R2MasterFile[];
  onDeleteFile: (id: string) => Promise<unknown>;
  /** True mientras un borrado está en curso; bloquea los botones. */
  isSaving?: boolean;
}

type FolderFilter = 'all' | R2MasterFile['folder'];

const FOLDERS: { id: FolderFilter; label: string }[] = [
  { id: 'all', label: 'Todos los Archivos' },
  { id: 'Carousel', label: 'Carrusel Landing' },
  { id: 'Promociones', label: 'Promociones' },
  { id: 'Sedes', label: 'Fotos Sedes' },
  { id: 'Entrenadores', label: 'Entrenadores' },
  { id: 'Logos', label: 'Logotipos' },
  { id: 'Documentos', label: 'Documentos' },
  { id: 'Iconos', label: 'Iconos' },
];

const formatSize = (bytes: number): string => {
  if (bytes >= 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  return `${Math.round(bytes / 1024)} KB`;
};

export const MasterFileManager: React.FC<MasterFileManagerProps> = ({
  files,
  onDeleteFile,
  isSaving = false,
}) => {
  const [activeFolder, setActiveFolder] = useState<FolderFilter>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyUrl = (file: R2MasterFile) => {
    navigator.clipboard.writeText(file.url);
    setCopiedId(file.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredFiles =
    activeFolder === 'all' ? files : files.filter((f) => f.folder === activeFolder);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <FolderArchive className="w-6 h-6 text-brand-primary" />
            <span>Gestor de Archivos & Assets Cloudflare R2</span>
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Almacenamiento global S3/R2 para imágenes del carrusel, promos, sedes y documentos legales.
          </p>
        </div>

        <span className="px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-xl text-[11px] text-neutral-400 font-medium">
          La carga de archivos se habilita con el módulo de storage R2
        </span>
      </div>

      {/* Folder Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-neutral-800 pb-3">
        {FOLDERS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveFolder(tab.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeFolder === tab.id
                ? 'bg-brand-primary text-brand-primary-contrast shadow-brand-glow'
                : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white'
            }`}
          >
            <Folder className="w-3.5 h-3.5" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {filteredFiles.length === 0 && (
        <p className="py-16 text-center text-sm text-neutral-500">
          No hay archivos en esta carpeta.
        </p>
      )}

      {/* Grid of Files */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredFiles.map((file) => (
          <div key={file.id} className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between group">

            <div className="relative h-40 bg-neutral-950 flex items-center justify-center overflow-hidden">
              {file.fileType === 'image' ? (
                <img src={file.url} alt={file.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              ) : (
                <FileText className="w-16 h-16 text-brand-primary" />
              )}

              <a
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-3 right-3 p-2 bg-black/60 backdrop-blur-md text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                title="Abrir archivo"
              >
                <Eye className="w-4 h-4" />
              </a>
            </div>

            <div className="p-4 space-y-2">
              <span className="text-[10px] uppercase font-mono text-brand-primary font-bold px-2 py-0.5 bg-brand-primary-alpha border border-brand-primary-alpha rounded-md inline-block">
                {file.folder}
              </span>
              <h4 className="font-bold text-xs text-white truncate" title={file.name}>{file.name}</h4>
              <div className="flex justify-between text-[10px] text-neutral-500 font-mono">
                <span>{formatSize(file.sizeBytes)}</span>
                <span>{file.uploadDate}</span>
              </div>
            </div>

            <div className="p-3 bg-neutral-950 border-t border-neutral-800 flex gap-2">
              <button
                onClick={() => handleCopyUrl(file)}
                className="flex-1 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-[11px] rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedId === file.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedId === file.id ? 'Copiado!' : 'Copiar URL R2'}</span>
              </button>

              <ActionButton
                onAction={() => onDeleteFile(file.id)}
                isBusy={isSaving}
                busyLabel=""
                icon={<Trash2 className="w-3.5 h-3.5" />}
                className="p-1.5 bg-rose-950/40 text-rose-400 hover:bg-rose-900/60 rounded-xl cursor-pointer"
                title="Eliminar de R2"
              >
                <span className="sr-only">Eliminar de R2</span>
              </ActionButton>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
