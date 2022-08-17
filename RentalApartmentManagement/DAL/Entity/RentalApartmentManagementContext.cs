using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace DAL.Entity
{
    public partial class RentalApartmentManagementContext : DbContext
    {
        public RentalApartmentManagementContext()
        {
        }

        public RentalApartmentManagementContext(DbContextOptions<RentalApartmentManagementContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Account> Account { get; set; }
        public virtual DbSet<Comment> Comment { get; set; }
        public virtual DbSet<Image> Image { get; set; }
        public virtual DbSet<OrderDetail> OrderDetail { get; set; }
        public virtual DbSet<Post> Post { get; set; }
        public virtual DbSet<Rating> Rating { get; set; }
        public virtual DbSet<Role> Role { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Server=DESKTOP-7VAHJN0\\NGUYENTRUNGKIEN;Database=RentalApartmentManagement;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Account>(entity =>
            {
                entity.HasIndex(e => e.Email)
                    .HasName("UQ__Account__AB6E6164E7185047")
                    .IsUnique();

                entity.HasIndex(e => e.IdCard)
                    .HasName("UQ__Account__8BA3E8F6B410C818")
                    .IsUnique();

                entity.HasIndex(e => e.PhoneNumber)
                    .HasName("UQ__Account__4849DA015A8F6406")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Address)
                    .HasColumnName("address")
                    .HasMaxLength(255);

                entity.Property(e => e.DateCreated)
                    .HasColumnName("dateCreated")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasColumnName("email")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasColumnName("firstName")
                    .HasMaxLength(50);

                entity.Property(e => e.Gender)
                    .IsRequired()
                    .HasColumnName("gender")
                    .HasMaxLength(10);

                entity.Property(e => e.IdCard)
                    .IsRequired()
                    .HasColumnName("idCard")
                    .HasMaxLength(12)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.LastName)
                    .IsRequired()
                    .HasColumnName("lastName")
                    .HasMaxLength(50);

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasColumnName("password")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.PhoneNumber)
                    .IsRequired()
                    .HasColumnName("phoneNumber")
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.RoleId).HasColumnName("roleId");

                entity.Property(e => e.Status)
                    .HasColumnName("status")
                    .HasDefaultValueSql("((1))");

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.Account)
                    .HasForeignKey(d => d.RoleId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Account_Role");
            });

            modelBuilder.Entity<Comment>(entity =>
            {
                entity.HasKey(e => new { e.AccountId, e.PostId })
                    .HasName("PK__Comment__4FB7E22791CC95E5");

                entity.Property(e => e.AccountId).HasColumnName("accountId");

                entity.Property(e => e.PostId).HasColumnName("postId");

                entity.Property(e => e.Content)
                    .IsRequired()
                    .HasColumnName("content")
                    .HasColumnType("text");

                entity.Property(e => e.DateCreated)
                    .HasColumnName("dateCreated")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.HasOne(d => d.Account)
                    .WithMany(p => p.Comment)
                    .HasForeignKey(d => d.AccountId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Comment_Account");

                entity.HasOne(d => d.Post)
                    .WithMany(p => p.Comment)
                    .HasForeignKey(d => d.PostId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Comment_Post");
            });

            modelBuilder.Entity<Image>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Path)
                    .IsRequired()
                    .HasColumnName("path")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.PostId).HasColumnName("postId");

                entity.HasOne(d => d.Post)
                    .WithMany(p => p.Image)
                    .HasForeignKey(d => d.PostId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Image_Post");
            });

            modelBuilder.Entity<OrderDetail>(entity =>
            {
                entity.HasKey(e => new { e.PostId, e.AccountId })
                    .HasName("PK__OrderDet__222A01CB9BFC2AC8");

                entity.Property(e => e.PostId).HasColumnName("postId");

                entity.Property(e => e.AccountId).HasColumnName("accountId");

                entity.Property(e => e.MonthAmount)
                    .HasColumnName("monthAmount")
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.OrderDated)
                    .HasColumnName("orderDated")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.PriceTotal)
                    .HasColumnName("priceTotal")
                    .HasColumnType("decimal(18, 0)")
                    .HasDefaultValueSql("((0))");

                entity.HasOne(d => d.Account)
                    .WithMany(p => p.OrderDetail)
                    .HasForeignKey(d => d.AccountId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_OrderDetail_Account");

                entity.HasOne(d => d.Post)
                    .WithMany(p => p.OrderDetail)
                    .HasForeignKey(d => d.PostId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_OrderDetail_Post");
            });

            modelBuilder.Entity<Post>(entity =>
            {
                entity.HasIndex(e => e.Title)
                    .HasName("UQ__Post__E52A1BB304AB8C64")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.AccountId).HasColumnName("accountId");

                entity.Property(e => e.Address)
                    .IsRequired()
                    .HasColumnName("address")
                    .HasMaxLength(255);

                entity.Property(e => e.Content)
                    .IsRequired()
                    .HasColumnName("content")
                    .HasColumnType("text");

                entity.Property(e => e.DateCreated)
                    .HasColumnName("dateCreated")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Latitude)
                    .IsRequired()
                    .HasColumnName("latitude")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.LikeAmount)
                    .HasColumnName("likeAmount")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.Longitude)
                    .IsRequired()
                    .HasColumnName("longitude")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.PricePerMonth)
                    .HasColumnName("pricePerMonth")
                    .HasColumnType("decimal(18, 0)")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.Status)
                    .HasColumnName("status")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasColumnName("title")
                    .HasMaxLength(100);

                entity.HasOne(d => d.Account)
                    .WithMany(p => p.Post)
                    .HasForeignKey(d => d.AccountId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Post_Account");
            });

            modelBuilder.Entity<Rating>(entity =>
            {
                entity.HasKey(e => new { e.AccountId, e.PostId })
                    .HasName("PK__Rating__4FB7E227520347A9");

                entity.Property(e => e.AccountId).HasColumnName("accountId");

                entity.Property(e => e.PostId).HasColumnName("postId");

                entity.Property(e => e.RateAmount)
                    .HasColumnName("rateAmount")
                    .HasDefaultValueSql("((1))");

                entity.HasOne(d => d.Account)
                    .WithMany(p => p.Rating)
                    .HasForeignKey(d => d.AccountId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Rating_Account");

                entity.HasOne(d => d.Post)
                    .WithMany(p => p.Rating)
                    .HasForeignKey(d => d.PostId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Rating_Post");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.HasIndex(e => e.Name)
                    .HasName("UQ__Role__72E12F1B37061A14")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name")
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
